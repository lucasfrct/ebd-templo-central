(()=> {
    "use strict"


    angular
        .module("ebd")
        .service("firebase.admin.service", ["$firebase.init.service", AdminService])

    function AdminService(){
        const that = this
        const db   = firebase.firestore ( );
        
        that.get = {
            users: GetUsers,
        }

        function GetUsers(callback) {
            const data = Array();
            db
                .collection("users")
                .get()
                .then((doc)=> {
                    doc.forEach((doc)=>{
                        data.push(doc.data())
                    })
                })
                .catch((error)=> {
                    data.push(error)
                })
                .finally(()=> {
                    callback(data)
                })
        }
    }
})()