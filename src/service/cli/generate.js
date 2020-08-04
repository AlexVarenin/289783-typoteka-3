'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {ExitCode} = require(`../../constants`);

const moment = require('moment');

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  ``
];

const SENTENCES = [

];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const generateDate = () => {
  return moment(new Date()).subtract(getRandomInt(0, 3), 'months').format('YYYY-MM-DD hh:mm:ss');
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(SENTENCES).slice(1, 5).join(` `),
    fullText: shuffle(SENTENCES).slice(1, getRandomInt(2, SENTENCES.length - 1)).join(` `),
    createdDate: generateDate(),
    category: shuffle(CATEGORIES).slice(1, getRandomInt(2, CATEGORIES.length - 1))
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
