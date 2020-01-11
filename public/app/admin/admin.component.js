(()=> {
    "use stric"

    angular
        .module("ebd")
        .config(AdminConfig)
        .component("admin", {
            templateUrl: "app/admin/admin.html",
            controller: ["$scope", "firebase.admin.service", AdminController]
        })
    
    function AdminConfig($routeProvider) {
        $routeProvider.when("/admin", { template: "<admin></admin>" })
    }

    function AdminController($scope, AdminService) {

        $scope.control = {
            classes: ["Crianças","Juniores","Adolescentes","Jovens","Adultos","Batismo"],
            class: "Jovens",
            teachers: ["Junior","Eli Filho"],
            students: [],
            number: 0,
        }

        AdminService.get.users((data)=>{
            $scope.control.students = data
            $scope.control.teachers = Filterteachers($scope.control.students, $scope.control.class);
            $scope.$apply()
        })

        $scope.$watch("control.class", (newValue)=> {
            $scope.control.teachers = Filterteachers($scope.control.students, newValue);
        })

        function Filterteachers(data, cl) {
            return data.filter((item)=> {
                return (item.class.indexOf("Professor") >= 0 && item.class.indexOf(cl) >= 0) ? item : false
            })
        }
    }
})()