window.confirmDelete = function(id, userEmail){

    const confirmed = confirm(`Voulez vous vraiment supprimer l'utilisateur "${userEmail}"`);

    if(confirmed){
        $.ajax({
            type: "DELETE",
            url: "/",
            data: {id},
            success: () => {
                window.location.replace("/");
            },
            dataType: "json"
          });
    }
}