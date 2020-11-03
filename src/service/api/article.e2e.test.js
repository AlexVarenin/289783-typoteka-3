"use strict";

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": "2ghXc_",
    "title": "Как перестать беспокоиться и начать жить",
    "announce": " Золотое сечение — соотношение двух величин, гармоническая пропорция. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Из под его пера вышло 8 платиновых альбомов.",
    "fullText": "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Он написал больше 30 хитов. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Как начать действовать? Для начала просто соберитесь. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов.",
    "createdDate": "2020-08-29 11:30:33",
    "category": [
      "IT",
      "Железо",
      "Программирование",
      "Печеньки",
      "Деревья",
      "Бухлишко",
      "Кино"
    ],
    "comments": [
      {
        "id": "GZw5lW",
        "text": "Хочу такую же футболку :-)"
      },
      {
        "id": "kKrkvy",
        "text": " Плюсую, но слишком много буквы!"
      },
      {
        "id": "ro1XhA",
        "text": "Совсем немного... Планируете записать видосик на эту тему?"
      },
      {
        "id": "1p1ago",
        "text": "Планируете записать видосик на эту тему? Согласен с автором! "
      }
    ]
  },
  {
    "id": "_7Wn3D",
    "title": "Как начать программировать",
    "announce": "Золотое сечение — соотношение двух величин, гармоническая пропорция. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.",
    "fullText": "Достичь успеха помогут ежедневные повторения. Ёлки — это не просто красивое дерево. Это прочная древесина. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Первая большая ёлка была установлена только в 1938 году.  Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Игры - это замечательно, писать игры - еще лучше. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Он написал больше 30 хитов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.",
    "createdDate": "2020-07-29 11:30:33",
    "category": [
      "За жизнь",
      "Разное",
      "Железо"
    ],
    "comments": [
      {
        "id": "mAKgv-",
        "text": "Плюсую, но слишком много буквы!"
      },
      {
        "id": "Hg6INx",
        "text": "Согласен с автором! Плюсую, но слишком много буквы!"
      },
      {
        "id": "1-gfGs",
        "text": "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Хочу такую же футболку :-)"
      }
    ]
  },
  {
    "id": "8u-f7e",
    "title": "Обзор новейшего смартфона",
    "announce": "Программировать не настолько сложно, как об этом говорят. Достичь успеха помогут ежедневные повторения. Первая большая ёлка была установлена только в 1938 году. Простые ежедневные упражнения помогут достичь успеха.",
    "fullText": "Как начать действовать? Для начала просто соберитесь. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Он написал больше 30 хитов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Программировать не настолько сложно, как об этом говорят.  Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Это один из лучших рок-музыкантов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
    "createdDate": "2020-08-29 11:30:33",
    "category": [
      "",
      "IT",
      "Без рамки",
      "Программирование",
      "Кино",
      "Музыка",
      "Бухлишко",
      "За жизнь",
      "Печеньки",
      "Деревья"
    ],
    "comments": [
      {
        "id": "A3CsRA",
        "text": " Это где ж такие красоты?"
      },
      {
        "id": "-5RidH",
        "text": "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили."
      },
      {
        "id": "qODXc8",
        "text": ""
      }
    ]
  },
  {
    "id": "fGsTSN",
    "title": "Учим HTML и CSS",
    "announce": "Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.",
    "fullText": "Первая большая ёлка была установлена только в 1938 году. Игры - это замечательно, писать игры - еще лучше. Достичь успеха помогут ежедневные повторения. Ёлки — это не просто красивое дерево. Это прочная древесина. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Как начать действовать? Для начала просто соберитесь. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Программировать не настолько сложно, как об этом говорят. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.",
    "createdDate": "2020-09-29 11:30:33",
    "category": [
      "Разное",
      "Печеньки",
      "За жизнь",
      "IT",
      "Бухлишко",
      "Без рамки",
      "Деревья",
      "Кино"
    ],
    "comments": [
      {
        "id": "Is5Vqk",
        "text": "Совсем немного... Согласен с автором! "
      },
      {
        "id": "P8jJ1T",
        "text": "Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-)"
      },
      {
        "id": "Hh5Wk5",
        "text": "Это где ж такие красоты?  Мне не нравится ваш стиль. Ощущение, что вы меня поучаете."
      }
    ]
  },
  {
    "id": "tNYTmX",
    "title": "Что такое золотое сечение",
    "announce": "Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Он написал больше 30 хитов. Собрать камни бесконечности легко, если вы прирожденный герой. Это один из лучших рок-музыкантов.",
    "fullText": "Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Программировать не настолько сложно, как об этом говорят. Это один из лучших рок-музыкантов.",
    "createdDate": "2020-10-29 11:30:33",
    "category": [
      "За жизнь"
    ],
    "comments": [
      {
        "id": "j_fVnQ",
        "text": "Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?"
      },
      {
        "id": "m7QP7n",
        "text": ""
      }
    ]
  }
];


const createAPI = () => {
  const app = express();
  const clonedData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new ArticleService(clonedData), new CommentService());
  return app
};

describe(`API returns a list of all articles`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/article`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First article's id equals "2ghXc_"`, () => expect(response.body[0].id).toBe(`2ghXc_`));

});

describe(`API returns an article with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/article/2ghXc_`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Как перестать беспокоиться и начать жить"`, () => expect(response.body.title).toBe(`Как перестать беспокоиться и начать жить`));

});

describe(`API creates an article if data is valid`, () => {

  const newArticle = {
    category: `Печеньки`,
    title: `Кушаю вкусные печеньки`,
    announce: `Кушаю...`,
    fullText: `Кушаю вкусные печеньки. Все.`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/article`)
      .send(newArticle);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Articles count is changed`, () => request(app)
    .get(`/article`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    category: `Печеньки`,
    title: `Кушаю вкусные печеньки`,
    announce: `Кушаю...`,
    fullText: `Кушаю вкусные печеньки. Все.`
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badOffer = {...newArticle};
      delete badOffer[key];
      await request(app)
        .post(`/article`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent article`, () => {

  const newArticle = {
    category: `Печеньки`,
    title: `Кушаю вкусные печеньки`,
    announce: `Кушаю...`,
    fullText: `Кушаю вкусные печеньки. Все.`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/article/2ghXc_`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/article/2ghXc_`)
    .expect((res) => expect(res.body.title).toBe(`Кушаю вкусные печеньки`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, () => {

  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `совершенно`,
    announce: `валидная`,
    fullText: `статья`
  };

  return request(app)
    .put(`/article/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {

  const app = createAPI();

  const invalidOffer = {
    category: `нет`,
    title: `поля`,
    announce: `fullText`
  };

  return request(app)
    .put(`/article/NOEXST`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/article/2ghXc_`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`2ghXc_`));

  test(`Article count is 4 now`, () => request(app)
    .get(`/article`)
    .expect((res) => {
      console.log(res.body);
      return expect(res.body.length).toBe(4);
    })
  );

});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/article/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/article/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/article/GxdTgz/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});
