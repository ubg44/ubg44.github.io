const GAMEs= [];
let searchQuery= "";


DoSearch= function(searchQuery) {
    let found= false;
    let cnt= 0;
    for (i= 0; i<= 25; i++) {
        $("#menuSearch").children("a").eq(1).remove();
    }
    GAMEs.forEach((item)=> {
        let match= true;
        let pos= 0;
        let title= item?.["title"]?? "";
        let site= item?.["site"]?? "";
        let link= item?.["link"]?? "";
        for (i=0; i< searchQuery.length; i++) {
            let newPos= title.toLowerCase().indexOf(searchQuery[i], pos);
            if (newPos< 0) {
                match= false;
                break;
           } else {
               pos= newPos;
           }
        }
        if (match && cnt<= 10) {
            cnt++;
            found= true;
            let newSubMenu= `<a class="dropdown-item" href="https://${site}${link}">${title}</a>`;
            $('#menuSearch').append(newSubMenu);
        }        
    });
    // console.log(searchQuery);
    if (!found) {
        let NotFoundSubMenu = "<a class=\"dropdown-item\" href=\"#\">Not Found!</a>";
        $('#menuSearch').append(NotFoundSubMenu);
    }    
}


SearchQueryChange= function() {
    if (searchQuery!= $("#searchInput").val()) {
        searchQuery= $("#searchInput").val();
        if (searchQuery!= "") {
            DoSearch(searchQuery.toLowerCase());
        }        
    }    
}


$("#searchMenu").click(function(v){    
    setTimeout(()=> {
        $("#searchInput").select();
        $("#searchInput").focus();  
    }, 100);    
});


$.get("/assets/js/games.json", {}, function(data, response) {
    try {
        data["games"].forEach((item)=> {
            GAMEs.push(item);
        });
    } catch (e) {}    
    console.log("GAMEs", GAMEs);
});
setInterval(SearchQueryChange, 500);
