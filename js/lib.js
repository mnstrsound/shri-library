var lib =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SHRI = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Student = __webpack_require__(1);

	var _Mentor = __webpack_require__(6);

	var _Team = __webpack_require__(4);

	var _IndividualTask = __webpack_require__(2);

	var _TeamTask = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SHRI = exports.SHRI = function () {
	    function SHRI() {
	        _classCallCheck(this, SHRI);

	        this.students = [];
	        this.mentors = [];
	        this.teams = [];
	        this.tasks = [];
	        this.uniqueStudentId = 0;
	        this.uniqueMentorId = 0;
	        this.uniqueTeamId = 0;
	        this.uniqueTaskId = 0;
	        this.sorted = false;
	    }

	    /*Методы для создания сущностей*/


	    _createClass(SHRI, [{
	        key: 'addStudent',
	        value: function addStudent(person) {
	            if (this.sorted) {
	                throw new Error('Невозможно добавить студента, так как школа уже отсортирована!');
	            }
	            person.id = this.uniqueStudentId++;
	            person.shri = this;
	            var student = new _Student.Student(person);
	            this.students.push(student);
	            return student;
	        }
	    }, {
	        key: 'addMentor',
	        value: function addMentor(person) {
	            if (this.sorted) {
	                throw new Error('Невозможно добавить ментора, так как школа уже отсортирована!');
	            }
	            person.id = this.uniqueMentorId++;
	            person.shri = this;
	            var mentor = new _Mentor.Mentor(person);
	            this.mentors.push(mentor);
	            return mentor;
	        }
	    }, {
	        key: 'addTeam',
	        value: function addTeam(team) {
	            team.id = this.uniqueTeamId++;
	            team.shri = this;
	            team = new _Team.Team(team);
	            this.teams.push(team);
	            return team;
	        }
	    }, {
	        key: 'addTask',
	        value: function addTask(type, task) {
	            task.id = this.uniqueTaskId++;
	            task.shri = this;
	            if (type == 'individual') {
	                task = new _IndividualTask.IndividualTask(task);
	            } else if (type == 'team') {
	                task = new _TeamTask.TeamTask(task);
	            } else {
	                throw new Error('Тип должен быть либо Индивидуальный либо Командный!');
	            }
	            this.tasks.push(task);
	            return task;
	        }

	        /*Методы для получения массивов сущностей*/

	    }, {
	        key: 'getStudents',
	        value: function getStudents() {
	            return this.students;
	        }
	    }, {
	        key: 'getMentors',
	        value: function getMentors() {
	            return this.mentors;
	        }
	    }, {
	        key: 'getTeams',
	        value: function getTeams() {
	            return this.teams;
	        }
	    }, {
	        key: 'getTasks',
	        value: function getTasks() {
	            return this.tasks;
	        }
	    }, {
	        key: '_getTasksByType',
	        value: function _getTasksByType(type) {
	            var tasks = [];
	            this.tasks.forEach(function (task) {
	                if (task.type.slug === type) {
	                    tasks.push(task);
	                }
	            });
	            return tasks;
	        }
	    }, {
	        key: 'getIndividualTasks',
	        value: function getIndividualTasks() {
	            return this._getTasksByType('individual');
	        }
	    }, {
	        key: 'getTeamTasks',
	        value: function getTeamTasks() {
	            return this._getTasksByType('team');
	        }
	    }, {
	        key: 'findByName',
	        value: function findByName(type, name) {
	            if (type !== 'mentors' && type !== 'students') return;
	            var founded = [];
	            this[type].forEach(function (person) {
	                if (person.name === name) {
	                    founded.push(person);
	                }
	            });
	            return founded;
	        }

	        /*
	        * Валидация перед сортировкой
	        * */

	    }, {
	        key: '_validateBeforeSorting',
	        value: function _validateBeforeSorting() {
	            if (this.sorted) {
	                throw new Error('Школа уже отсортирована!');
	            }
	            var mentors = this.getMentors();
	            var students = this.getStudents();
	            var mentorsCount = mentors.length;
	            var studentsCount = students.length;

	            for (var i = 0, len = mentorsCount; i < len; i++) {
	                if (mentors[i].getPriorities().length < studentsCount) {
	                    throw new Error('У ментора ' + mentors[i].name + ' не до конца проставлены приоритеты!');
	                }
	            }
	            for (var _i = 0, _len = studentsCount; _i < _len; _i++) {
	                if (students[_i].getPriorities().length < mentorsCount) {
	                    throw new Error('У студента ' + students[_i].name + ' не до конца проставлены приоритеты!');
	                }
	            }
	        }
	    }, {
	        key: 'sortByPriorities',
	        value: function sortByPriorities() {
	            this._validateBeforeSorting();

	            /*
	            * Создаем массивы свободных к распределению студентов и менторов.
	            * */
	            var freeStudents = this.getStudents().slice(0);
	            var freeMentors = this.getMentors().slice(0);

	            /*
	            * Запускаем цикл по распредению студентов среди менторов
	            * */

	            while (freeStudents.length > 0) {
	                var _loop = function _loop(i, len) {
	                    var mentor = freeMentors[i];
	                    /*
	                    * Если количество студентов не кратно количеству ментору, то у одного ментора или у нескольких менторов
	                    * должно быть на 1 студента больше, и мы должны поволить ему/им набрать еще одного, если у них совпадают приориеты.
	                     * maxCount - максимальное количество студентов, которое может набрать ментор.
	                     * maxStudentsCount - максимальное количество студентов, которое может набрать ментор за итерацию.
	                    * */
	                    var maxCount = freeStudents.length % freeMentors.length == 0 ? freeStudents.length / freeMentors.length : parseInt(freeStudents.length / freeMentors.length) + 1;
	                    var maxStudentsCount = maxCount - mentor.getStudents().length;

	                    for (var _i2 = 0, _len2 = mentor.priorities.length; _i2 < _len2; _i2++) {
	                        var priority = mentor.priorities[_i2];

	                        /*
	                        * Если ментор набрал максимальное количество студентов,
	                        * то удалем его из свободных к распределению менторов, удаляем его из
	                        * списка приоритета остальных участников, чтобы он больше
	                        * не учавствовал в сортировке и прерываем цикл по метке, так как изменилась длина массива().
	                        * TODO: Оптимизировать цикл, без прерывания по метке.
	                        * */
	                        if (mentor.getStudents().length >= maxStudentsCount) {
	                            freeMentors.splice(freeMentors.indexOf(mentor), 1);
	                            freeStudents.forEach(function (student) {
	                                if (student.priorities.indexOf(mentor) !== -1) {
	                                    student.priorities.splice(student.priorities.indexOf(mentor), 1);
	                                }
	                            });
	                            return 'break|mentorsIterator';
	                        }
	                        /*Если первый по приоритету ментор студента совпадает со сравниваемым ментором и
	                        * студент находится в списке свободных к распределению,
	                        * то добавляем ментору студена, удаляем ментора из списка приоритетов студента,
	                        * добавляем студенту ментора, удаляем студента из списка свободных к распределению студентов.
	                        * */
	                        if (priority.priorities[0] === mentor && freeStudents.indexOf(priority) !== -1) {
	                            mentor.addStudent(priority);
	                            priority.priorities.splice(0, 1);
	                            priority.setMentor(mentor);
	                            freeStudents.splice(freeStudents.indexOf(priority), 1);
	                        }
	                    }
	                };

	                mentorsIterator: for (var i = 0, len = freeMentors.length; i < len; i++) {
	                    var _ret = _loop(i, len);

	                    if (_ret === 'break|mentorsIterator') break mentorsIterator;
	                }
	            }
	            this.sorted = true;
	        }
	    }]);

	    return SHRI;
	}();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _require = __webpack_require__(2);

	var IndividualTask = _require.IndividualTask;

	var _require2 = __webpack_require__(4);

	var Team = _require2.Team;

	var _require3 = __webpack_require__(6);

	var Mentor = _require3.Mentor;

	var Student = exports.Student = function () {
	    function Student(person) {
	        _classCallCheck(this, Student);

	        if (!person.name || typeof person.name !== 'string') {
	            throw new Error('Вы не указали имя студента');
	        }
	        this.id = person.id;
	        this.shri = person.shri;
	        this.name = person.name;
	        this.tasks = [];
	        this.priorities = [];
	        this.mentor = null;
	        if (person.team && person.team instanceof Team) {
	            this.team = person.team;
	        }
	    }

	    /*
	    * Добавление задачи студенту.
	    * */


	    _createClass(Student, [{
	        key: 'addTask',
	        value: function addTask(task) {
	            if (!task instanceof IndividualTask) {
	                throw new Error('Параметр доджен быть типа Индивидуальное Задание!');
	            }
	            if (this.tasks.indexOf(task) !== -1) {
	                throw new Error('У студента уже есть такое задание!');
	            }
	            this.tasks.push({ task: task, mark: null });
	        }

	        /*
	        * Удаление задачи
	        * */

	    }, {
	        key: 'removeTask',
	        value: function removeTask(task) {
	            var tasks = this.getTasks();

	            for (var i = 0, len = tasks.length; i < len; i++) {
	                if (tasks[i].task === task.task) {
	                    /*
	                    * Если задаче проставлена оценка, то ее невозможно удалить,
	                    * как будто она занесена в школный журнал и править в журнале нельзя.
	                    * */
	                    if (tasks[i].mark) {
	                        throw new Error('Невозможно удалить задачу, так как ей проставлена оценка!');
	                    } else {
	                        tasks.splice(i, 1);
	                    }
	                    break;
	                }
	            }
	        }

	        /*
	        * Назначение команды
	        * */

	    }, {
	        key: 'setTeam',
	        value: function setTeam(team) {
	            if (!team instanceof Team) {
	                throw new Error('Параметр должен быть типа Команда!');
	            }
	            if (this.team && this.team !== team) {
	                this.team.deleteMember(this);
	            }
	            team.addMember(this);
	        }

	        /*
	        * Назначение ментора
	        * */

	    }, {
	        key: 'setMentor',
	        value: function setMentor(mentor) {
	            if (!mentor instanceof Mentor) {
	                throw new Error('Параметр должен быть типа Ментор!');
	            }
	            this.mentor = mentor;
	        }

	        /*
	        * Установка приоритета
	        * */

	    }, {
	        key: 'setPriority',
	        value: function setPriority(mentor) {
	            if (!mentor instanceof Mentor) {
	                throw new Error('Параметр должен быть типа Ментор!');
	            }
	            this.priorities.push(mentor);
	        }

	        /*
	        * Установка приоритетов
	        * */

	    }, {
	        key: 'setPriorities',
	        value: function setPriorities(mentors) {
	            var _this = this;

	            mentors.forEach(function (mentor) {
	                _this.setPriority(mentor);
	            });
	        }

	        /*
	        * Проставление оценки задаче
	        * */

	    }, {
	        key: 'setTaskMark',
	        value: function setTaskMark(task, mark) {
	            if (mark < 1 || mark > 5) {
	                throw new Error('Оценка должна быть в промежутке от 1 до 5!');
	            }
	            var stTask = this._findTaskById(task.id);
	            stTask.mark = mark;
	            return this;
	        }

	        /*
	        * Получение назначенных заданий
	        * */

	    }, {
	        key: 'getTasks',
	        value: function getTasks() {
	            return this.tasks;
	        }

	        /*
	        * Получение списка доступных заданий (список всех существующих задач не включая уже назначенные задания)
	        * */

	    }, {
	        key: 'getFreeTasks',
	        value: function getFreeTasks() {
	            var _this2 = this;

	            var freeTasks = [];

	            this.shri.getIndividualTasks().forEach(function (shriTask) {
	                if (_this2._indexOfTask(shriTask) == -1) {
	                    freeTasks.push(shriTask);
	                }
	            });
	            return freeTasks;
	        }

	        /*
	         * Получение ментора
	         * */

	    }, {
	        key: 'getMentor',
	        value: function getMentor() {
	            return this.mentor;
	        }

	        /*
	        * Функция получения приоритетов
	        * */

	    }, {
	        key: 'getPriorities',
	        value: function getPriorities() {
	            if (this.mentor) {
	                return [];
	            }
	            return this.priorities;
	        }

	        /*
	        * Функция получения доступных для заполнения менторов
	        * */

	    }, {
	        key: 'getFreePriorities',
	        value: function getFreePriorities() {
	            if (this.mentor) {
	                return [];
	            }

	            var mentors = this.shri.getMentors();
	            var currentMentors = this.getPriorities();
	            var freeMentors = [];

	            for (var i = 0, len = mentors.length; i < len; i++) {
	                if (currentMentors.indexOf(mentors[i]) == -1) {
	                    freeMentors.push(mentors[i]);
	                }
	            }
	            return freeMentors;
	        }

	        /*
	        * Вспомогательная функция поиска индекса задачи, если она есть у студента
	        * */

	    }, {
	        key: '_indexOfTask',
	        value: function _indexOfTask(task) {
	            var i = void 0;
	            var len = void 0;
	            var tasks = this.getTasks();

	            for (i = 0, len = tasks.length; i < len; i++) {
	                if (tasks[i].task === task) {
	                    return i;
	                    break;
	                }
	            }
	            return -1;
	        }

	        /*
	        * Вспомогательная функция поиска задачи по уникальному идентификатору
	        * */

	    }, {
	        key: '_findTaskById',
	        value: function _findTaskById(id) {
	            var tasks = this.getTasks();
	            var founded = void 0;

	            tasks.forEach(function (task) {
	                if (task.task.id === id) {
	                    return founded = task;
	                }
	            });
	            return founded;
	        }
	    }]);

	    return Student;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IndividualTask = undefined;

	var _Task2 = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IndividualTask = exports.IndividualTask = function (_Task) {
	    _inherits(IndividualTask, _Task);

	    function IndividualTask(task) {
	        _classCallCheck(this, IndividualTask);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IndividualTask).call(this, task));

	        _this.type = {
	            name: 'Индивидуальная',
	            slug: 'individual'
	        };
	        return _this;
	    }

	    return IndividualTask;
	}(_Task2.Task);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Task = exports.Task = function Task(task) {
	    _classCallCheck(this, Task);

	    if (!task.title || !task.desc) {
	        throw new Error('Не указан заголовок и/или описание');
	    }
	    this.id = task.id;
	    this.shri = task.shri;
	    this.title = task.title;
	    this.desc = task.desc;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Team = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _TeamTask = __webpack_require__(5);

	var _Student = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Team = exports.Team = function () {
	    function Team(team) {
	        _classCallCheck(this, Team);

	        if (!team.name) {
	            throw new Error('Вы не указали название команды');
	        }
	        this.id = team.id;
	        this.shri = team.shri;
	        this.name = team.name;
	        this.members = [];
	        this.tasks = [];
	    }

	    /*
	    * Добавление члена команды
	    * */


	    _createClass(Team, [{
	        key: 'addMember',
	        value: function addMember(member) {
	            if (!member instanceof _Student.Student) {
	                throw new Error('Параметр должен быть типа Студент!');
	            }
	            if (this.members.indexOf(member) !== -1) {
	                console.log('Студент не может быть добавлен в команду дважды!');
	                return this;
	            }
	            member.team = this;
	            this.members.push(member);
	            return this;
	        }

	        /*
	        * Удаление члена команды
	        * */

	    }, {
	        key: 'deleteMember',
	        value: function deleteMember(member) {
	            var members = this.getMembers();
	            var index = members.indexOf(member);
	            if (index !== -1) {
	                this.members.splice(index, 1);
	                member.team = null;
	            }
	        }

	        /*
	        * Поиск члена команды по уникальному идентификатору
	        * */

	    }, {
	        key: 'findMemberById',
	        value: function findMemberById(id) {
	            this.members.forEach(function (member) {
	                if (member.id === id) {
	                    return member;
	                } else {
	                    return undefined;
	                }
	            });
	        }

	        /*
	        * Поиск студента
	        * */

	    }, {
	        key: 'findStudent',
	        value: function findStudent(member) {
	            if (!member instanceof _Student.Student) {
	                throw new Error('Параметр должен быть типа Студент!');
	            }
	            return this.findMemberById(member.id);
	        }

	        /*
	        * Функция добавления командной задачи
	        * */

	    }, {
	        key: 'addTask',
	        value: function addTask(task) {
	            if (!task instanceof _TeamTask.TeamTask) {
	                throw new Error('Параметр должен быть типа Командная Задача!');
	            }
	            if (this.tasks.indexOf(task) !== -1) {
	                throw new Error('У команды уже есть такое задание!');
	            }
	            this.tasks.push({ task: task, mark: null });
	        }

	        /*
	        * Получение членов команды
	        * */

	    }, {
	        key: 'getMembers',
	        value: function getMembers() {
	            return this.members;
	        }

	        /*
	        * Получение списка всех задач
	        * */

	    }, {
	        key: 'getTasks',
	        value: function getTasks() {
	            return this.tasks;
	        }

	        /*
	        * Полчуение списка доступных задач
	        * */

	    }, {
	        key: 'getFreeTasks',
	        value: function getFreeTasks() {
	            var _this = this;

	            var freeTasks = [];

	            this.shri.getTeamTasks().forEach(function (shriTask) {
	                if (_this._indexOfTask(shriTask) == -1) {
	                    freeTasks.push(shriTask);
	                }
	            });
	            return freeTasks;
	        }

	        /*
	        * Проставление оценки задаче
	        * */

	    }, {
	        key: 'setTaskMark',
	        value: function setTaskMark(task, mark) {
	            if (mark < 1 || mark > 5) {
	                throw new Error('Оценка должна быть в промежутке от 1 до 5!');
	            }
	            var teamTask = this._findTaskById(task.id);
	            teamTask.mark = mark;
	            return this;
	        }

	        /*
	        * Вспомогательная функция поиска индекса задачи, если она есть у команды
	        * */

	    }, {
	        key: '_indexOfTask',
	        value: function _indexOfTask(task) {
	            var i = void 0;
	            var len = void 0;
	            var tasks = this.getTasks();

	            for (i = 0, len = tasks.length; i < len; i++) {
	                if (tasks[i].task === task) {
	                    return i;
	                    break;
	                }
	            }
	            return -1;
	        }

	        /*
	         * Вспомогательная функция поиска задачи по уникальному идентификатору
	         * */

	    }, {
	        key: '_findTaskById',
	        value: function _findTaskById(id) {
	            this.tasks.forEach(function (task) {
	                if (task.task.id === id) {
	                    return task;
	                }
	            });
	        }
	    }]);

	    return Team;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TeamTask = undefined;

	var _Task2 = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TeamTask = exports.TeamTask = function (_Task) {
	    _inherits(TeamTask, _Task);

	    function TeamTask(task) {
	        _classCallCheck(this, TeamTask);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TeamTask).call(this, task));

	        _this.type = {
	            name: 'Командная',
	            slug: 'team'
	        };
	        return _this;
	    }

	    return TeamTask;
	}(_Task2.Task);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Mentor = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Student = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Mentor = exports.Mentor = function () {
	    function Mentor(person) {
	        _classCallCheck(this, Mentor);

	        this.id = person.id;
	        this.shri = person.shri;
	        this.name = person.name;
	        this.priorities = [];
	        this.students = [];
	    }

	    _createClass(Mentor, [{
	        key: 'addStudent',
	        value: function addStudent(student) {
	            if (!student instanceof _Student.Student) {
	                throw new Error('Парметр должен быть типа Студент!');
	            }
	            this.students.push(student);
	        }
	    }, {
	        key: 'getStudents',
	        value: function getStudents() {
	            return this.students;
	        }
	    }, {
	        key: 'getPriorities',
	        value: function getPriorities() {
	            return this.priorities;
	        }
	    }, {
	        key: 'getFreePriorities',
	        value: function getFreePriorities() {
	            var students = this.shri.getStudents();
	            var currentStudents = this.getPriorities();
	            var freeStudents = [];

	            for (var i = 0, len = students.length; i < len; i++) {
	                if (currentStudents.indexOf(students[i]) == -1) {
	                    freeStudents.push(students[i]);
	                }
	            }
	            return freeStudents;
	        }
	    }, {
	        key: 'setPriority',
	        value: function setPriority(student) {
	            if (!student instanceof _Student.Student) {
	                throw new Error('Параметр должен быть типа Студент!');
	            }
	            this.priorities.push(student);
	        }
	    }, {
	        key: 'setPriorities',
	        value: function setPriorities(students) {
	            var _this = this;

	            students.forEach(function (student) {
	                _this.setPriority(student);
	            });
	        }
	    }]);

	    return Mentor;
	}();

/***/ }
/******/ ]);