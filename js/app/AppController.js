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

    $scope.editMentor = function (mentor) {
        ngDialog.open({
            template: 'editMentor.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
            data: {
                mentor: mentor
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
}

