'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {ExitCode} = require(`../../constants`);
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const moment = require(`moment`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const generateDate = () => {
  return moment(new Date()).subtract(getRandomInt(0, 3), `months`).format(`YYYY-MM-DD hh:mm:ss`);
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, 5).join(` `),
    fullText: shuffle(sentences).slice(1, getRandomInt(2, sentences.length - 1)).join(` `),
    createdDate: generateDate(),
    category: shuffle(categories).slice(1, getRandomInt(2, categories.length - 1))
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
