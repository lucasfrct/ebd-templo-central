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
            classes: ["Crianças","Juniores","Adolescentes","Jovens","Adultos Homens", "Adultos Mulheres", "Batismo"],
            teachers: [],
            students: [],
            class: "Jovens",
            classFilter: "Jovens",
            genre: "male",
            strict: false,
            number: 0,
        }

        AdminService.get.users((data)=>{
            $scope.control.students = data
            $scope.control.teachers = Filterteachers($scope.control.students, $scope.control.class);
            $scope.$apply()
        })

        $scope.$watch("control.class", (newValue)=> {
            
            $scope.control.teachers = Filterteachers($scope.control.students, newValue);
            $scope.control.classFilter = $scope.control.class.replace("Homens", "").replace("Mulheres", "").trim()

            $scope.control.strict = false
            $scope.control.genre = "male"

            if ($scope.control.class.indexOf("Mulheres") != -1) {
                $scope.control.strict = true
                $scope.control.genre = "female"
            }

            if ($scope.control.class.indexOf("Homens") != -1) {
                $scope.control.strict = true
                $scope.control.genre = "male"
            }
        })

        function Filterteachers(data, cl) {
            return data.filter((item)=> {
                return (item.class.indexOf("Professor") >= 0 && item.class.indexOf(cl) >= 0) ? item : false
            })
        }
    }
})()