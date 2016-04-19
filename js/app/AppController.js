angular.module('app')
    .controller('AppController', AppController);

function AppController($scope, ngDialog) {

    $scope.savePerson = function (type, person) {
        if (type == 'student') {
            $scope.shri.addStudent(person);
        } else if (type == 'mentor') {
            $scope.shri.addMentor(person);
        }
    };

    $scope.taskTypes = [{name: 'Индивидуальная', slug: 'individual'}, {name: 'Командная', slug: 'team'}];

    $scope.saveTeam = function (team) {
        $scope.shri.addTeam(team);
    };

    $scope.saveTask = function (type, task) {
        $scope.shri.addTask(type.slug, task);
    };

    $scope.deleteStudent = function (student) {
        $scope.shri.removeStudent(student);
    };

    $scope.deleteMentor = function (mentor) {
        $scope.shri.removeMentor(mentor);
    };

    $scope.editPerson = function (person) {
        let type;
        let title;
        if (person instanceof Student) {
            type = 'student';
            title = 'Редактировать студента';
        } else if (person instanceof Mentor) {
            type = 'mentor';
            title = 'Редактировать ментора';
        }
        ngDialog.open({
            template: 'editPerson.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
            data: {
                type: type,
                title: title,
                person: person
            }
        });
    };

    $scope.createPerson = function (type) {
        var title;
        switch (type) {
            case 'student':
                title = 'Создать студента';
                break;
            case 'mentor':
                title = 'Создать ментора';
                break;
            default:
                title = '';
                break;
        }
        ngDialog.open({
            template: 'createPerson.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
            data: {
                type: type,
                title: title,
                person: {
                    name: '',
                    age: ''
                }
            }
        });
    };

    $scope.createTeam = function () {
        ngDialog.open({
            template: 'createTeam.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
            data: {
                team: {
                    name: ''
                }
            }
        });
    };

    $scope.createTask = function () {
        ngDialog.open({
            template: 'createTask.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
            data: {
                task: {
                    name: '',
                    desc: ''
                }
            }
        });
    };

    $scope.editStudent = function (student) {
        ngDialog.open({
            template: 'editStudent.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
            data: {
                student: student
            }
        });
    };

    $scope.editTeam = function (team) {
        ngDialog.open({
            template: 'editTeam.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
            data: {
                team: team
            }
        });
    };

    $scope.shri = new lib.SHRI;

    // var student1 = $scope.shri.addStudent({name: 'Петров Егор1'});
    // var student2 = $scope.shri.addStudent({name: 'Петров Егор2'});
    // var student3 = $scope.shri.addStudent({name: 'Петров Егор3'});
    // var student4 = $scope.shri.addStudent({name: 'Петров Егор4'});
    // var student5 = $scope.shri.addStudent({name: 'Петров Егор5'});
    // var student6 = $scope.shri.addStudent({name: 'Петров Егор6'});
    // var student7 = $scope.shri.addStudent({name: 'Петров Егор7'});
    // var student8 = $scope.shri.addStudent({name: 'Петров Егор8'});
    // var student9 = $scope.shri.addStudent({name: 'Петров Егор9'});
    //
    // var mentor1 = $scope.shri.addMentor({'name': 'Ментор1'});
    // var mentor2 = $scope.shri.addMentor({'name': 'Ментор2'});
    // var mentor3 = $scope.shri.addMentor({'name': 'Ментор3'});
    //
    // student1.setPriorities([mentor1, mentor3, mentor2]);
    // student2.setPriorities([mentor3, mentor2, mentor1]);
    // student3.setPriorities([mentor2, mentor3, mentor1]);
    // student4.setPriorities([mentor3, mentor1, mentor2]);
    // student5.setPriorities([mentor2, mentor1, mentor3]);
    // student6.setPriorities([mentor3, mentor2, mentor1]);
    // student7.setPriorities([mentor2, mentor1, mentor3]);
    // student8.setPriorities([mentor2, mentor1, mentor3]);
    // student9.setPriorities([mentor3, mentor1, mentor2]);
    //
    // mentor1.setPriorities([student1, student2, student3, student4, student5, student6, student7, student8, student9]);
    // mentor2.setPriorities([student2, student3, student1, student5, student4, student6, student7, student9, student8]);
    // mentor3.setPriorities([student6, student3, student5, student7, student4, student2, student8, student9, student1]);
    //
    // var task1 = $scope.shri.addTask('individual', {title: 'Новая задача1', desc: 'Описание новой задачи1'});
    // var task2 = $scope.shri.addTask('individual', {title: 'Новая задача2', desc: 'Описание новой задачи2'});
    // var task3 = $scope.shri.addTask('individual', {title: 'Новая задача3', desc: 'Описание новой задачи3'});
    // var task4 = $scope.shri.addTask('individual', {title: 'Новая задача4', desc: 'Описание новой задачи4'});
    //
    //
    // var task5 = $scope.shri.addTask('team', {title: 'Новая задача5', desc: 'Описание новой задачи1'});
    // var task6 = $scope.shri.addTask('team', {title: 'Новая задача6', desc: 'Описание новой задачи2'});
    // var task7 = $scope.shri.addTask('team', {title: 'Новая задача7', desc: 'Описание новой задачи3'});
    // var task8 = $scope.shri.addTask('team', {title: 'Новая задача8', desc: 'Описание новой задачи4'});
    //
    // student1.addTask(task2);
    // student1.addTask(task3);
    // $scope.shri.sortByPriorities();
}

