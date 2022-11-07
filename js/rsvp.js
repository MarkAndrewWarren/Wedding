function ajustMobile(){
    if(window.mobileCheck()){
        $("#topForm").removeClass('container');
        $("#mainForm").css("fontSize", "32px");
        $("#btn_submit").addClass("formMobileButton");
        $("#mainForm").addClass("formMobileInput");
    }
}
ajustMobile();

function checkForm(){
    var val_guestYes = $("#rd_comingYes").prop("checked");
    var val_guestNo = $("#rd_comingNo").prop("checked");

    if(val_guestYes){
        $("#dv_information").removeClass('hidden');
    }
    else if(val_guestNo){
        $("#dv_information").addClass('hidden');
    }
    else{
        $("#dv_information").addClass('hidden');
    }


    var val_plusYes = $("#rd_guestPlusYes").prop("checked");
    var val_plusNo = $("#rd_guestPlusNo").prop("checked");

    if(val_plusYes){
        $("#dv_plus1Section").removeClass('hidden');
    }
    else if(val_plusNo){
        $("#dv_plus1Section").addClass('hidden');
    }
    else{
        $("#dv_plus1Section").addClass('hidden');
    }


    var val_childrenYes = $("#rd_guestChildrenYes").prop("checked");
    var val_childrenNo = $("#rd_guestChildrenNo").prop("checked");

    if(val_childrenYes){
        $("#dv_childrenSection").removeClass('hidden');
    }
    else if (val_childrenNo){
        $("#dv_childrenSection").addClass('hidden');
    }
    else{
        $("#dv_childrenSection").addClass('hidden');
    }

    var val_guestEntreeDietYes = $("#rd_guestEntreeDiet").prop("checked");
    if(val_guestEntreeDietYes){
        $("#txt_guestEntreeDiet").removeClass('hidden');
    }
    else{
        $("#txt_guestEntreeDiet").addClass('hidden');
    }

    var val_plusEntreeDietYes = $("#rd_plusEntreeDiet").prop("checked");
    if(val_plusEntreeDietYes){
        $("#txt_plusEntreeDiet").removeClass('hidden');
    }
    else{
        $("#txt_plusEntreeDiet").addClass('hidden');
    }
}


function submitForm(){
    //validation
    var invalid = false;
    var RSVP = {};

    //Guest Name    
    var val_guestName = $("#txt_guest").val();
    invalid = validateEmpty(val_guestName, "d_guest");
    RSVP.guestName = val_guestName;

    //Is Coming    
    var qRtn = validateYesNo("coming", "d_coming");
    RSVP.isComing = qRtn.answer;
    invalid = (qRtn.invalid ? true : invalid);


    //Guest
    if(RSVP.isComing){
        //Guest Email    
        var val_guestEmail = $("#txt_guestEmail").val();
        invalid = (validateEmpty(val_guestEmail, "d_guestEmail") ? true : invalid);
        RSVP.guestEmail = val_guestEmail;

        //Meal choice
        var val_guestEntree = getMealChoice("guestEntree");    
        invalid = (validateEmpty(val_guestEntree, "d_guestEntree") ? true : invalid);
        RSVP.guestEntree = val_guestEntree;

        //Plus One
        var qRtn = validateYesNo("guestPlus", "d_guesPlus");
        RSVP.guestPlus = qRtn.answer;
        invalid = (qRtn.invalid ? true : invalid);

        //Welcome
        var qRtn = validateYesNo("guestWelcome", "d_guestWelcome");
        RSVP.guestWelcome = qRtn.answer;
        invalid = (qRtn.invalid ? true : invalid);

        //Children
        var qRtn = validateYesNo("guestChildren", "d_guestChildren");
        RSVP.guestChildren = qRtn.answer;
        invalid = (qRtn.invalid ? true : invalid);

        /*Submit---- if coming alone
        if(RSVP.isComing && !RSVP.guestPlus && !RSVP.guestChildren && !invalid){
            console.log('submit');        
            console.log(RSVP);

            return true;
        }*/

        //Plus One
        if(RSVP.guestPlus){
            //Plus one name
            var val_plusName = $("#txt_plus").val();
            invalid = (validateEmpty(val_plusName, "d_plus") ? true : invalid);
            RSVP.plusName = val_plusName;

            //plus one entree
            var val_plusEntree = getMealChoice("plusEntree");    
            invalid = (validateEmpty(val_plusEntree, "d_plusEntree") ? true : invalid);
            RSVP.plusEntree = val_plusEntree;
        }


        /*Submit---- if coming with plus one no children
        if(RSVP.isComing && RSVP.guestPlus && !RSVP.guestChildren && !invalid){
            console.log('submit');        
            console.log(RSVP);

            return true;
        }*/

        //Children
        if(RSVP.guestChildren){
            //Children Number
            var val_children = $("#ddl_children").val();
            invalid = (validateEmpty(val_children, "d_children") ? true : invalid);
            RSVP.children = val_children;

            //Children's meal number
            var val_childrenMeals = $("#ddl_childrenMeals").val();
            invalid = (validateEmpty(val_childrenMeals, "d_childrenMeals") ? true : invalid);
            RSVP.childrenMeals = val_childrenMeals;
        }
    }

    //Submit---- if coming with plus one no children
    if(!invalid)
    {
        $("#sp_required").addClass("hidden")
        RSVP.timeSubmitted = new Date();
        console.log('submit');        
        console.log(RSVP);

        RSVP.RowKey = (new Date()).toISOString();

        var URL = "https://prod-17.centralus.logic.azure.com:443/workflows/fa8083a56752458fabbbba0346483f1f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Vo2QcpCP9AN8SP_McrJ3tt6CSmxFgkDAPWBPtgNkFAg";
        var rsvpJson = JSON.stringify(RSVP);

        $.ajax({
            type: "POST",
            url: URL, 
            data: rsvpJson,
            dataType: "json", 
            contentType : 'application/json'})
            .done(function(data) { 
                console.log('complete') 
                if(RSVP.isComing)
                    setResults("coming");
                else
                    setResults("not");
            })
            .fail(function (xhr, ajaxOptions, thrownError) {
                setResults("error");
              })
            .always(function() { console.log("complete"); });

        return true;
    }
    else{
        $("#sp_required").removeClass("hidden")
    }

    console.log(RSVP);
}

function validateYesNo(name, section){
    var _invalid = false;
    var val_guestYes = $("#rd_" + name + "Yes").prop("checked");
    var val_guestNo = $("#rd_"+ name + "No").prop("checked");

    if(!(val_guestYes || val_guestNo)){
        $("#" + section).addClass("required");
        _invalid = true;
    }
    else{
        $("#" + section).removeClass("required");
    }

    var rtn = {answer: val_guestYes, invalid: _invalid};
    return rtn;
}

function getMealChoice(name){
    var val_beef = $("#rd_" + name + "Beef").prop("checked");
    var val_chicken = $("#rd_" + name + "Chicken").prop("checked");
    var val_ravioli = $("#rd_" + name + "Ravioli").prop("checked");
    var val_diet = $("#rd_" + name + "Diet").prop("checked");
    var val_dietInfo = $("#txt_" + name + "Diet").val();

    if(val_beef)
        return "Braised Short Rib";
    else if(val_chicken)
        return "Chicken Rulade";
    else if (val_ravioli)
        return "Mushroom Ravioli";
    else if (val_diet && val_dietInfo != '')
        return "Diet Restrictions: " + val_dietInfo;
    else
        return '';
}

function validateEmpty(value, section){
    var _invalid = false;
    if(value == ''){
        $("#" + section).addClass("required");
        _invalid = true;
    }
    else{
        $("#" + section).removeClass("required");
    }

    return _invalid;
}

function setPlusOne(){
    var val_plus  = $("#txt_plus").val();
    $("#sp_plusName").text(val_plus);
}

function setResults(result){
    $("#mainForm").addClass("hidden");
    $("#mainThankYouAttending").addClass("hidden");
    $("#mainSorry").addClass("hidden");
    $('#mainError').addClass("hidden");

    if(result == "coming"){
        $("#mainThankYouAttending").removeClass("hidden");
    }
    else if (result == "not"){
        $("#mainSorry").removeClass("hidden");
    }
    else if (result == "error"){
        $("#mainError").removeClass("hidden");
    }
    else{
        $("#mainForm").removeClass("hidden");
    }
}