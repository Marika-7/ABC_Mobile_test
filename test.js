class Test {
    _questions;
    _answers;
    _numberQuestion;
    currentAnswer;

    constructor() {
        this.initQuestions();
    }

    initQuestions() {
        this._questions = [
            {
                type: 'text',
                question: 'Ваш пол:',
                image: '',
                variants: ['Мужчина','Женщина']
            },
            {
                type: 'text',
                question: 'Укажите ваш возраст:',
                image: '',
                variants: ['До 18','От 18 до 28','От 29 до 35','От 29 до 35','от 36']
            },
            {
                type: 'text',
                question: 'Выберите лишнее:',
                image: '',
                variants: ['Дом','Шалаш','Бунгало','Скамейка','Хижина']
            },
            {
                type: 'text',
                question: 'Продолжите числовой ряд:',
                image: '',
                variants: ['62','48','74','57','60','77']
            },
            {
                type: 'color',
                question: 'Выберите цвет, который сейчас наиболее вам приятен:',
                image: '',
                variants: ['#A8A8A8','#0000A9','#00A701','#F60100','#FDFF19','#A95403','#000000','#850068','#46B3AC']
            },
            {
                type: 'color',
                question: 'Отдохните пару секунд, еще раз выберите цвет, который сейчас наиболее вам приятен:',
                image: '',
                variants: ['#A8A8A8','#46B3AC','#A95403','#00A701','#000000','#F60100','#850068','#FDFF19','#0000A9']
            },
            {
                type: 'text',
                question: 'Какой из городов лишний?',
                image: '',
                variants: ['Вашингтон','Лондон','Париж','Нью-Йорк','Москва','Оттава']
            },
            {
                type: 'image',
                question: 'Выберите правильную фигуру из четырёх пронумерованных.',
                image: 'test1.png',
                variants: ['1','2','3','4']
            },
            {
                type: 'text',
                question: 'Вам привычнее и важнее:',
                image: '',
                variants: ['Наслаждаться каждой минутой проведенного времени','Быть устремленными мыслями в будущее','Учитывать в ежедневной практике прошлый опыт']
            },
            {
                type: 'text',
                question: 'Какое определение, по-Вашему, больше подходит к этому геометрическому изображению:',
                image: 'test2.png',
                variants: ['Оно остроконечное','Оно устойчивое','Оно находиться в состоянии равновесия']
            },
            {
                type: 'image',
                question: 'Вставьте подходящее число',
                image: 'test3.png',
                variants: ['34','36','53','44','66','42']
            }
        ];
        this._answers = [];
        this._numberQuestion = 0;
    }

    getNumber() {
        return this._numberQuestion;
    }

    getQuestion() {
        return this._questions[this._numberQuestion];
    }

    saveAnswer() {
        const answer = {
            question: this._questions[this._numberQuestion].question,
            answer: this.currentAnswer
        }
        this._answers.push(answer);
        this._numberQuestion++;
    }

}