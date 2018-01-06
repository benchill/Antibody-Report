function sickleAlert (){
    var sickleAlert2 = document.antigenForm.sickle;
    if(sickleAlert2.checked) {
        alert("Include any phenotype matching requirements!");
    };
    processForm();
};

function processForm() {
    var antibodies = ["D", "C", "E", "c", "e", "K", "Kpa", "Jsa", "k", "Kpb", "Jsb", "Fya", "Fyb", "Jka", "Jkb", "M", "N", "S", "s", "U", "P", "Lea", "Leb", "Lua", "Lub"];
    var antibodiesLongName = ["D", "C", "E", "c", "e", "Kell", "Kpa", "Jsa", "k", "Kpb", "Jsb", "Fya", "Fyb", "Jka", "Jkb", "M", "N", "S", "s", "U", "P", "Lewis A", "Lewis B", "Lutheran A", "Lutheran B"];
    var i, percentComp;
    percentComp = [];
    for(i = 0; i < antibodies.length; i += 1) {
        percentComp[i] = document.antigenForm['comp' + antibodies[i]].value;
    };
    //special case for D
    percentComp[0] = 100;
          //  var percentComp = [document.antigenForm.compD.value, document.antigenForm.compC.value, document.antigenForm.compE.value, document.antigenForm.compc.value, document.antigenForm.compe.value, document.antigenForm.compK.value, document.antigenForm.compKpa.value, document.antigenForm.compJsa.value, document.antigenForm.compk.value, document.antigenForm.compKpb.value, document.antigenForm.compJsb.value, document.antigenForm.compFya.value, document.antigenForm.compFyb.value, document.antigenForm.compJka.value, document.antigenForm.compJkb.value, document.antigenForm.compM.value, document.antigenForm.compN.value, document.antigenForm.compN.value, document.antigenForm.compS.value, document.antigenForm.comps.value, document.antigenForm.compU.value,  document.antigenForm.compP.value, document.antigenForm.compLea.value, document.antigenForm.compLeb.value, document.antigenForm.compLua.value, document.antigenForm.compLub.value];
    //  below from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    var urlParams;
    (window.onpopstate = function () {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
    })();
    var tempMatrix = new Array();
    var tempMatrix2 = new Array();
    var tempMatrixA = new Array();
    var tempMatrix2A = new Array();
    var patientAntibodies = new Array();
    var patientClinicalAntibodies = new Array();
    var patientAntibodiesLongName = new Array();
    var patientClinicalAntibodiesLongName = new Array();
    var patientClinicalPercent = new Array();
    var compUnitsA = new Array();
    var antigen = document.antigenForm.antigen;
    var patientSex = document.antigenForm.patientSex;
    var pregnant = document.antigenForm.pregnant;
    var RhImmuno = document.antigenForm.RhImmuno;
    var tempNumberAntibodies = document.antigenForm.tempNumberAntibodies;
    var preSurgery = document.antigenForm.preSurgery;
    var specialCase = document.antigenForm.specialCase;
    var sickle = document.antigenForm.sickle;
    var patientPreSurgery;
    var patientSpecialCase;
    var compUnits = new Array();
    var compUnitsA2 = new Array();
    var percentCompatible = 1;
    var patientSexA = 0;
    var currentlyPregnant = false;
    var GivenRhImmuno = false;
    var sicklePatient = false;
    var numberAntibodies = 0;
    var numberClinicalAntibodies = 0;
    var n = 0;
    // setup time and date format    
    var now = new Date();
    var currDate = now.getDate();
    var currMonth = now.getMonth() + 1;
    var currYear = now.getFullYear();
    var currHour = now.getHours();
    var currMinute = now.getMinutes();
    if(currMinute < 10) {
        currMinute.toString;
        currMinute = "0" + currMinute;
    };
    //    Setup pronouns
    var hisOrHer = function(patientSexA) {
        if(patientSexA == "male") {
            return "his";
        }
        else if(patientSexA == "female") {
            return "her";
        }
        else {
            return "patient's";
        };
    };
    var heOrShe = function(patientSexA) {
        if(patientSexA == "male") {
            return "he";
        }
        else if(patientSexA == "female") {
            return "she";
        }
        else {
            return "patient";
        };
    };
    var heOrSheCap = function(patientSexA) {
        if(patientSexA == "male") {
            return "He";
        }
        else if(patientSexA == "female") {
            return "She";
        }
        else {
            return "This patient";
        };
    };
    //    Setup cause of antibody formation
    var causeOfAntibody = function(patientSexA) {
        if(patientSexA == "male") {
            return " previous transfusion ";
        }
        else if(patientSexA == "female") {
            return " previous transfusion or pregnancy ";
        }
        else {
            return " previous transfusion ";
        };
    };
    //    Consequence of Antibody
    var consequenceAntibody = function(currentlyPregnant) {
        if(currentlyPregnant == false) {
            return " a hemolytic transfusion reaction";
        }
        else if(currentlyPregnant == true) {
            return " a hemolytic transfusion reaction or hemolytic disease of the fetus and newborn";
        }
        else {
            return " a hemolytic transfusion reaction";
        };
    };
    var consequenceAntibody2 = function(currentlyPregnant) {
        if(currentlyPregnant == false) {
            return " a hemolytic transfusion reaction";
        }
        else if(currentlyPregnant == true) {
            return " a hemolytic transfusion reaction or hemolytic disease of the fetus and newborn";
        }
        else {
            return " a hemolytic transfusion reaction";
        };
    };
    // from Sean Wilkinson
    conjoin = function(x) {
        // This function joins the elements of an array using the "Oxford comma".
        if((x instanceof Array) === false) {
            throw new TypeError('Argument must be an array.');
        }
        if(x.length < 3) {
            return x.join(' and anti-');
        }
        return x.slice(0, -1).join(', anti-') + ', and anti-' + x.slice(-1);
    };
    conjoinB = function(x) {
        // This function joins the elements of an array using the "Oxford comma".
        if((x instanceof Array) === false) {
            throw new TypeError('Argument must be an array.');
        }
        if(x.length < 3) {
            return x.join('- and ');
        }
        return x.slice(0, -1).join('-, ') + '-, and ' + x.slice(-1);
    };
// Set up arrays of patient antibodies based on selected antibodies; non checked elements defined as 0
    for(i = 0; i < antibodies.length; i++) {
        tempMatrix[i] = 0;
        compUnits[i] = 0;
        tempMatrix2[i] = 0;
        if(antigen[i].checked) {
            tempMatrix[i] = antibodies[i];
            tempMatrix2[i] = antibodiesLongName[i];
            compUnits[i] = percentComp[i];
        };
    };

// Define arrays listing patient antibodies (long and short names)
    for(i = 0; i < antibodies.length; i++) {
        if(tempMatrix[i] != 0) {
            patientAntibodies.push(tempMatrix[i]);
            compUnitsA.push(percentComp[i]);
            patientAntibodiesLongName.push(tempMatrix2[i]);
            tempMatrix[i] = true;
            numberAntibodies += 1;

        };
    };
 //  Array listing clinically significant antibodies
    for(i = 0; i < antibodies.length; i++) {
       tempMatrixA[i] = 0;
        tempMatrix2A[i] = 0;
        compUnitsA2[i] = 0;
        if(antigen[i].checked) {
          tempMatrixA[i] = antibodies[i];
          tempMatrix2A[i] = antibodiesLongName[i];
          compUnitsA2[i] = percentComp[i];
          };
          };
// Set Lewis P1 = 0
            tempMatrixA[20] = 0;
            tempMatrix2A[20] = 0;
            compUnitsA2[20] = 0;
// Set Lewis A = 0
          tempMatrixA[21] = 0;
          tempMatrix2A[21] = 0;
          compUnitsA2[21] = 0;
// Set Lewis B = 0
          tempMatrixA[22] = 0;
          tempMatrix2A[22] = 0;
          compUnitsA2[22] = 0;
// Set  M= 0
          tempMatrixA[15] = 0;
          tempMatrix2A[15] = 0;
          compUnitsA2[15] = 0;
// Set N= 0
          tempMatrixA[16] = 0;
          tempMatrix2A[16] = 0;
          compUnitsA2[16] = 0;
//  Set LuA = 0
          tempMatrixA[23] = 0;
          tempMatrix2A[23] = 0;
          compUnitsA2[23] = 0;
//  Set LuB = 0
          tempMatrixA[24] = 0;
          tempMatrix2A[24] = 0;
          compUnitsA2[24] = 0;
// Define arrays listing clinically significant patient antibodies (long and short names)
    for(i = 0; i < antibodies.length; i++) {
        if(tempMatrixA[i] != 0) {
            patientClinicalAntibodies.push(tempMatrixA[i]);
            patientClinicalAntibodiesLongName.push(tempMatrix2A[i]);
            patientClinicalPercent.push(compUnitsA2[i]);
            tempMatrixA[i] = true;
            numberClinicalAntibodies += 1;

        };
    };
    if (RhImmuno.checked){
        GivenRhImmuno = true;
    };
    //   Set sicklePatient equal to true if checked
    if(sickle.checked) {
        sicklePatient = true;
    };
 //   Set currentlyPregnant equal to true if checked
    if(pregnant.checked) {
        currentlyPregnant = true;
    };
 //    Set preSurgery equal to true if checked
    if(preSurgery.checked) {
        patientPreSurgery = true;
    };
 //    Set specialCase equal to true if checked
    if(specialCase.checked) {
        patientSpecialCase = true;
    };
 // Reset text area
    document.antigenForm.textField.value = "";
    if(patientAntibodies.length === 0) {
        document.antigenForm.textField.value = "";
    };
    var numberRhAntigens = antigen[0].checked + antigen[1].checked +antigen[2].checked + antigen[3].checked + antigen[4].checked;
    var finalPercentCompatible = 1;
// Calculate percentCompatible using clinically significant antibodies
    for(i = 0; i < patientClinicalPercent.length; i++) { 
           finalPercentCompatible = finalPercentCompatible*patientClinicalPercent[i]/100;     
    };
 percentCompatible = finalPercentCompatible*100;
    var percentCompatibleOld = percentCompatible;

    //Special cases for multiple Rh alloantibodies
    if (numberRhAntigens > 1){
        // subtract out Rh antigens (CEce)
  //   for D
  //     if (antigen[0].checked){
   //         percentCompatible= percentCompatible/percentComp[0]*100;
   //     };
        if (antigen[1].checked){
            percentCompatible= percentCompatible/percentComp[1]*100;
        };
        if (antigen[2].checked){
            percentCompatible= percentCompatible/percentComp[2]*100;
        };
        if (antigen[3].checked){
            percentCompatible= percentCompatible/percentComp[3]*100;
        };
        if (antigen[4].checked){
        percentCompatible= percentCompatible/percentComp[4]*100;
        };
        //recalculate for negative for D antigen
        if (antigen[0].checked == false){
         // anti-C and anti-E
            if (antigen[1].checked ==true && antigen[2].checked ==true){
                percentCompatible=percentCompatible*(0.0016+0.0296+0.1369);
            };
            // anti-C and anti-e
            if (antigen[1].checked ==true && antigen[4].checked ==true){
                percentCompatible=percentCompatible*(0.02+0.003);
            };
            // anti-c and anti-E
            if (antigen[3].checked ==true && antigen[2].checked ==true){
                percentCompatible=percentCompatible*(0.176+0.017);
            };
            // anti-c and anti-e
            if (antigen[3].checked ==true && antigen[4].checked ==true){
                percentCompatible=percentCompatible*(0.0001);
            };
        };
        //recalculate for postive for D antigen
        if (antigen[0].checked == true){
            // anti-C and anti-E
            if (antigen[1].checked ==true && antigen[2].checked ==true){
                percentCompatible=percentCompatible*(0.9428);
            };
            // anti-C and anti-e
            if (antigen[1].checked ==true && antigen[4].checked ==true){
                percentCompatible=percentCompatible*(0.0001);
            };
            // anti-c and anti-E
            if (antigen[3].checked ==true && antigen[2].checked ==true){
                percentCompatible=percentCompatible*(0.0001);
            };
            // anti-c and anti-e
            if (antigen[3].checked ==true && antigen[4].checked ==true){
                percentCompatible=percentCompatible*(0.0001);
            };
            // anti-C
            if (antigen[1].checked ==true  && numberRhAntigens == 2){
                percentCompatible=percentCompatible*(0.9428+0.01928);
            };
            // anti-E
            if (antigen[2].checked ==true && numberRhAntigens == 2){
                percentCompatible=percentCompatible*(0.9428+0.0379);
            };
            // anti-c   estimated #
            if (antigen[3].checked ==true && numberRhAntigens == 2){
                percentCompatible=percentCompatible*(0.0001);
            };
            // anti-e   estimated #
            if (antigen[4].checked ==true && numberRhAntigens == 2){
                percentCompatible=percentCompatible*(0.0001);
            };
        };
    };
              //   document.antigenForm.textField.value += finalPercentCompatible*100 ;
               //   document.antigenForm.textField.value += patientClinicalPercent;
             //    document.antigenForm.textField.value +=patientClinicalAntibodiesLongName;
             // Populate antibody drop down for titer  http://jsfiddle.net/nExgJ/
             //dropdown.add(new Option(patientAntibodies[0], "U"), "1");
              //var dropdown = document.antigenForm.selectAntibody1;
              // Loop through the array
              //if(numberAntibodies>0){
              //   for (i = 0; i < patientAntibodies.length; ++i) {
             //   Append the element to the end of Array list
             //       dropdown[dropdown.length] = new Option(patientAntibodies[i], patientAntibodies[i]);
//  Function to remove options from dropdown menu for titers
    function removeAllOptions(x) {
        var i;
        for(i = x.options.length - 1; i >= 0; i--) {
            x.remove(i);
        }
    };
               //for(i = 0; i<numberAntibodies; i += 1) {
               //    document.antigenForm.selectAntibody1.selected
               //}
               //    document.antigenForm.tempNumberAntibodies.value = numberAntibodies;
//  Empty and repopulate drop down menus for titer
    if(tempNumberAntibodies.value != numberAntibodies) {
        var dropdown1 = document.antigenForm.selectAntibody1;
        var dropdown2 = document.antigenForm.selectAntibody2;
        removeAllOptions(dropdown1);
        removeAllOptions(dropdown2);
        for(i = 0; i < numberAntibodies; i += 1) {
            dropdown1.add(new Option(patientAntibodies[i], patientAntibodies[i]), i);
            dropdown2.add(new Option(patientAntibodies[i], patientAntibodies[i]), i);
        }
        document.antigenForm.tempNumberAntibodies.value = numberAntibodies;
    };
            //     }​;
            //  };
            //document.antigenForm.textField.value +=dropdown
            //
    var sickle1 = function() {
        if(sicklePatient === true){
            return " hemoglobin S-negative";
        }
        else{
            return "";
        }
    };
    var sickle2 = function() {
        if(sicklePatient === true){
            return " that are negative for hemoglobin S";
        }
        else{
            return "";
        }
    };
// Function to add statement for Surgical patient
    var presurgery = function () {
        if (patientPreSurgery === true) {
            document.antigenForm.textField.value += "The blood bank needs a new sample within 3 days of surgery because "+  heOrShe(patientSexA) +" has a positive antibody screen.  ";
        };
    };
    var presurgery2 = function () {
        if (patientPreSurgery === true) {
            document.antigenForm.textField.value += "The blood bank needs a new sample within 3 days of surgery because "+  heOrShe(patientSexA) +" has anti-" + conjoin(patientClinicalAntibodiesLongName) + ".  ";
        };
    };
  //  define function for non-specific antibodies  *** need to add case with both WAA and nonspecific reactivity ****
   var nonspecific = function () {
      if(document.antigenForm.nonspecificReactivity.checked  &&  numberAntibodies === 0) {
        document.antigenForm.textField.value = "";
        presurgery();
        document.antigenForm.textField.value += "This test suggested a red cell antibody in the patient's plasma. However, all common clinically significant alloantibodies were ruled out with reagent red blood cells.  Should " + heOrShe(patientSexA) + " require transfusions in the future, extended crossmatch compatible" + sickle1(sicklePatient) + " units will be provided.  ";
    };
        if(document.antigenForm.nonspecificReactivity.checked  &&  numberAntibodies > 0) {
        document.antigenForm.textField.value += "The workup also showed non-specific reactivity suggestive of an additional red cell antibody in the patient's plasma.  ";
    };

    };
  //  Patient with antibodies; functions definition
    var patientHasAntibodies = function() {
        if(patientClinicalAntibodies.length >= 1) {
      //      presurgery();
            document.antigenForm.textField.value += "This patient has anti-" + conjoin(patientClinicalAntibodiesLongName) +". ";
        };
    };
  // Provides sentence if patient has additional antibodies in a special case
    var patientAlsoHasAntibodies = function(m) {
        if(patientClinicalAntibodies.length > 1) {
            //            presurgery();
            var count = 0;
            var alsoHasAntibodies = new Array();
            for(i = 0; i < patientClinicalAntibodies.length; i += 1) {
                if(patientClinicalAntibodies[i] != m) {
                    alsoHasAntibodies[count] = patientClinicalAntibodiesLongName[i];
                    count += 1;
                };
            }
            document.antigenForm.textField.value += heOrSheCap(patientSexA) + " also has anti-" + conjoin(alsoHasAntibodies);
        };
    };
 // Function; specify one antibody and function will list other antibodies
    var patientRemainingAntibodies = function(m1) {
        if(patientClinicalAntibodies.length > 1) {
            var count = 0;
            var remainingAntibodies = new Array();
            for(i = 0; i < patientClinicalAntibodies.length; i += 1) {
                if(patientClinicalAntibodies[i] != m1) {
                    remainingAntibodies[count] = patientClinicalAntibodiesLongName[i];
                    count += 1;
                };
            }
            document.antigenForm.textField.value += conjoin(remainingAntibodies);
        };
         if(patientClinicalAntibodies.length === 1) {
            //            presurgery();
            var count = 0;
            var remainingAntibodies2 = new Array();
            for(i = 0; i < patientClinicalAntibodies.length; i += 1) {
                if(patientClinicalAntibodies[i] != m1) {
                    remainingAntibodies2[count] = patientClinicalAntibodiesLongName[i];
                    count += 1;
                };
            }
            document.antigenForm.textField.value += remainingAntibodies2;
        };
    };
   // Antibody titers (up to 2 titers)
    var patientTiters = function() {
        if(document.antigenForm.antTiter1.checked) {
            if(document.antigenForm.antTiter1.checked && document.antigenForm.antTiter2.checked) {
                document.antigenForm.textField.value += "Anti-" + document.antigenForm.selectAntibody1.value + " is present at a titer of " + document.antigenForm.titer1.value + " and anti-" + document.antigenForm.selectAntibody2.value + " is present at a titer of " + document.antigenForm.titer2.value + ". ";
            }
            else {
                document.antigenForm.textField.value += "Anti-" + document.antigenForm.selectAntibody1.value + " is present at a titer of " + document.antigenForm.titer1.value + ". ";
            }
        };
    }
    // Anti D  with history of Rh immunoglobulin
    var rhogamD = function () {
       if (numberAntibodies > 1 && antigen[0].checked && document.antigenForm.RhImmuno.checked) {
            if (patientSexA === "female") {
                document.antigenForm.textField.value += "The anti-D is likely due to Rh immunoglobulin administration during this pregnancy. ";
            }
            else if (patientSexA === "male") {
                document.antigenForm.textField.value += "The anti-D is likely due to Rh immunoglobulin administration in the last month to prevent Rh sensitization from platelet transfusions. "
   //             document.antigenForm.textField.value += "If red cell transfusion is necessary, the Blood Bank will issue extended crossmatch compatible Rh negative units. ";
            }
            else {
                document.antigenForm.textField.value += "The anti-D is likely due to Rh immunoglobulin administration. "
            };
        };
      if(numberClinicalAntibodies === 1 && antigen[0].checked && document.antigenForm.RhImmuno.checked) {
       document.antigenForm.textField.value = "";
       if(patientSexA === "female") {
            document.antigenForm.textField.value += "The patient has anti-D, likely due to Rh immunoglobulin administration during this pregnancy. ";
 //           document.antigenForm.textField.value += "If transfusion is necessary, the Blood Bank will issue extended crossmatch compatible Rh negative units to prevent sensitization to the D antigen. ";
        }
        else if(patientSexA==="male"){
            document.antigenForm.textField.value +="The patient has anti-D, likely due to Rh immunoglobulin administration in the last month to prevent Rh sensitization from platelet transfusions. "
 //           document.antigenForm.textField.value +="If red cell transfusion is necessary, the Blood Bank will issue extended crossmatch compatible Rh negative units. ";  
       }
        else{
           document.antigenForm.textField.value +="The patient has anti-D, likely due to Rh immunoglobulin administration. "
 //          document.antigenForm.textField.value +="If red cell transfusion is necessary, the Blood Bank will issue extended crossmatch compatible Rh negative units. ";    
        };    
     };
    };
    // Anti-M and one or more alloantibody
    var MAndOther = function () {
        if (numberAntibodies > 1 && antigen[15].checked) {
            document.antigenForm.textField.value += heOrSheCap(patientSexA) + " also has anti-M which can be naturally occurring and does not react at body temperature; thus, it is not clinically significant. ";
        };
    };
   // Anti-N and one or more alloantibody
    var NAndOther = function () {
        if (numberAntibodies > 1 && antigen[16].checked) {
            document.antigenForm.textField.value += heOrSheCap(patientSexA) + " also has anti-N which is a cold reacting antibody and typically not clinically significant. ";
        };
    };
    // Anti-P1 and one or more alloantibody
    var P1ndOther = function () {
        if (numberAntibodies > 1 && antigen[20].checked) {
            document.antigenForm.textField.value += heOrSheCap(patientSexA) + " also has anti-P1 which can be naturally occurring and does not cause transfusion reactions. ";
        };
    };
    // Define patient sex    
    for(i = 0; i < 2; i++) {
        if(patientSex[i].checked) {
            patientSexA = patientSex[i].value;
        };
    };
    if(patientSexA === 'male') {
        currentlyPregnant = false;
    }
    // Define cause and effect of antibodies
    var causeAndEffect = function () {
        if (numberClinicalAntibodies === 1) {
            document.antigenForm.textField.value += "This alloantibody is usually a consequence of" + causeOfAntibody(patientSexA) + "and can cause" + consequenceAntibody(currentlyPregnant) + ". ";
        };
        if (numberClinicalAntibodies >= 2) {
            document.antigenForm.textField.value += "These alloantibodies are usually a consequence of" + causeOfAntibody(patientSexA) + "and can cause" + consequenceAntibody(currentlyPregnant) + ". ";
        };
    };
               // non-specific reactivity
              //        if(document.antigenForm.nonspecificReactivity.checked  &&  numberAntibodies > 0) {
                //        document.antigenForm.textField.value += "The work-up also showed non-specific reactivity. The non-specific positivity demonstrating in the patient's serum cannot be further characterized at this time.  ";
              //    };
    //Lewis  antibodies  ** Check for duplicate statements when function is used with others  *****
    var LewisAPregnant = function(){
        if (currentlyPregnant===true){
            return "The Lewis A antigen is not developed on the red cells of newborn infants and the antibody does not cause hemolytic disease of the fetus and newborn.  ";
        }
        else{
            return "";
        }
    };
    var LewisBPregnant = function(){
        if (currentlyPregnant===true){
            return "The Lewis B antigen is not developed on the red cells of newborn infants and the antibody does not cause hemolytic disease of the fetus and newborn.  ";
        }
        else{
            return "";
        }
    };
    var LewisPregnant = function(){
        if (currentlyPregnant===true){
            return "The Lewis antigens are not developed on the red cells of newborn infants and the antibodies do not cause hemolytic disease of the fetus and newborn.  ";
        }
        else{
            return "";
        }
    };
    var lewisGroup = function () {
        // Lewis a 
        if (numberClinicalAntibodies >= 1) {
            if (antigen[21].checked && antigen[22].checked == '0') {
                document.antigenForm.textField.value += "The patient also has an anti-Lewis A. Anti-Lewis A can be naturally occurring and does not cause hemolytic transfusion reactions. " + LewisAPregnant(currentlyPregnant) + "Thus, it is rarely clinically significant. ";
            };
        };
        if (numberClinicalAntibodies === 0) {
            if (antigen[21].checked && antigen[22].checked == '0') {
                document.antigenForm.textField.value += "The patient has an anti-Lewis A. Anti-Lewis A can be naturally occurring and does not cause hemolytic transfusion reactions. " + LewisAPregnant(currentlyPregnant) + "Thus, it is rarely clinically significant. ";
            };
        };
        //Lewis b antibodies
        if (numberClinicalAntibodies >= 1) {
            if (antigen[22].checked && antigen[21].checked == '0') {
                document.antigenForm.textField.value += "The patient also has an anti-Lewis B. Anti-Lewis B can be naturally occurring and does not cause hemolytic transfusion reactions. " + LewisBPregnant(currentlyPregnant) + "Thus, it is rarely clinically significant. ";
            };
        };
        if (numberClinicalAntibodies === 0) {
            if (antigen[22].checked && antigen[21].checked == '0') {
                document.antigenForm.textField.value += "The patient has an anti-Lewis B. Anti-Lewis B can be naturally occurring and does not cause hemolytic transfusion reactions. " + LewisBPregnant(currentlyPregnant) + "Thus, it is rarely clinically significant. ";
            };
        };
        if (numberClinicalAntibodies >= 1) {
            if (antigen[21].checked && antigen[22].checked) {
                document.antigenForm.textField.value += "The patient also has an anti-Lewis A and an anti-Lewis B. Anti-Lewis A and B can be naturally occurring and do not cause hemolytic transfusion reactions. " + LewisPregnant(currentlyPregnant) + "Thus, Lewis antibodies are rarely clinically significant. ";
            }
            ;
        };
        if (numberClinicalAntibodies == 0) {
            if (antigen[21].checked && antigen[22].checked) {
                document.antigenForm.textField.value += "The patient has an anti-Lewis A and an anti-Lewis B. Anti-Lewis A and B can be naturally occurring and do not cause hemolytic transfusion reactions. " + LewisPregnant(currentlyPregnant) + "Thus, Lewis antibodies are rarely clinically significant. ";
            };

        };
        // crossmatch statement for lewis b 
        //if (numberClinicalAntibodies === 0 && antigen[21].checked) {
        //    document.antigenForm.textField.value += "If transfusion is necessary, the patient will receive extended crossmatch compatible units. ";
        //};
        // crossmatch statement for lewis b
        if (numberClinicalAntibodies === 0 && (antigen[22].checked || antigen[21].checked)) {
            document.antigenForm.textField.value += "If transfusion is necessary, the patient will receive extended crossmatch compatible units" + sickle2(sicklePatient) + ". ";
        };
         //   document.antigenForm.textField.value += antigen[22].checked + antigen[21].checked;

    };

    var lutheranGroup = function () {
        // Lutheran a
        if (numberClinicalAntibodies >= 1) {
            if (antigen[23].checked && antigen[24].checked == '0') {
                document.antigenForm.textField.value += "The patient also has an anti-Lutheran A. Anti-Lutheran A can be naturally occurring and does not cause hemolytic transfusion reactions. Thus, it is not clinically significant. ";
            };
        };
        if (numberClinicalAntibodies === 0) {
            if (antigen[23].checked && antigen[24].checked == '0') {
                document.antigenForm.textField.value += "The patient has an anti-Lutheran A. Anti-Lutheran A can be naturally occurring and does not cause hemolytic transfusion reactions. Thus, it is not clinically significant. ";
            };
        };
        //Lutheran b antibodies
        if (numberClinicalAntibodies >= 1) {
            if (antigen[24].checked && antigen[23].checked == '0') {
                document.antigenForm.textField.value += "The patient also has an anti-Lutheran B. Anti-Lutheran B does not cause hemolytic transfusion reactions. Thus, it is not clinically significant. ";
            };
        };
        if (numberClinicalAntibodies === 0) {
            if (antigen[24].checked && antigen[23].checked == '0') {
                document.antigenForm.textField.value += "The patient has an anti-Lutheran B. Anti-Lutheran B does not cause hemolytic transfusion reactions. Thus, it is not clinically significant. ";
            };
        };
        if (numberClinicalAntibodies >= 1) {
            if (antigen[23].checked && antigen[24].checked) {
                document.antigenForm.textField.value += "WARNING!!! LUTHERAN A AND B ARE ANTITHETICAL ANTIGENS! ";
            }
            ;
        };
        if (numberClinicalAntibodies == 0) {
            if (antigen[23].checked && antigen[24].checked) {
                document.antigenForm.textField.value += "WARNING!!! LUTHERAN A AND B ARE ANTITHETICAL ANTIGENS! ";
            };

        };
        // crossmatch statement for lewis b
        if (numberClinicalAntibodies === 0 && (antigen[23].checked || antigen[24].checked)) {
            document.antigenForm.textField.value += "If transfusion is necessary, the patient will receive extended crossmatch compatible units" + sickle1(sicklePatient) + ". ";
        };
        //   document.antigenForm.textField.value += antigen[22].checked + antigen[21].checked;

    };


    // Weak warm autoantibody and one or more alloantibodies
    var warmAutoAntibody = function () {
        if (document.antigenForm.warmAuto.checked && numberClinicalAntibodies >= 1) {
            if (document.antigenForm.warmAutoStrength.value == "weak") {
                document.antigenForm.textField.value += "There is also a weak warm autoantibody coating the patient's red blood cells (weak positive DAT).  This autoantibody is probably not clinically significant. "
  //               "If transfusion is needed, the Blood Bank will issue units that are compatible with the patient's plasma where the antibody was removed by adsorption with the patient's cells. "
            };
        };
    };
        // strong warm autoantibody and more than one alloantibodies
    var strongWarmAutoAntibody = function () {
        if (document.antigenForm.warmAuto.checked && numberClinicalAntibodies >= 1 && document.antigenForm.warmAutoStrength.value == "strong") {
            document.antigenForm.textField.value += "strong warm auto ";
          //               "If transfusion is needed, the Blood Bank will issue units that are compatible with the patient's plasma where the antibody was removed by adsorption with the patient's cells. "

        };
    };
    // Specify type of units patient will receive; antigen[0] specifies D
  //  var otherThanD = new Array();
    // Function; specify one antibody and function will list other antibodies
    var antigensOtherThan = function(m1) {
              var count = 0;
            var remainingAntibodies = new Array();
            for(i = 0; i < patientClinicalAntibodies.length; i += 1) {
                if (patientClinicalAntibodies[i] != m1) {
                    remainingAntibodies[count] = patientClinicalAntibodiesLongName[i];
                    count += 1;
                }
                ;
            };
            document.antigenForm.textField.value += conjoinB(remainingAntibodies);
        };

  //  otherThanD = patientRemainingAntibodies("D");
    var patientMustReceive = function () {
        if (patientSexA != 0 && numberClinicalAntibodies >= 1) {
            if (document.antigenForm.antigen[0].checked == false) {
                document.antigenForm.textField.value += "If transfusion is necessary, " +  heOrShe(patientSexA) + " must receive extended crossmatch compatible " + conjoinB(patientClinicalAntibodies) + "-antigen negative units" + sickle2(sicklePatient)+". ";
            }
            else if (document.antigenForm.antigen[0].checked == true && numberClinicalAntibodies == 1){
                document.antigenForm.textField.value += "If transfusion is necessary, " +  heOrShe(patientSexA) + " must receive extended crossmatch compatible Rh negative units"+ sickle2(sicklePatient)+". ";
            }

            else if (document.antigenForm.antigen[0].checked == true && numberClinicalAntibodies == 2){
                document.antigenForm.textField.value += "If transfusion is necessary, " +  heOrShe(patientSexA) + " must receive" + sickle1(sicklePatient) + " extended crossmatch compatible Rh negative units that are also lacking the ";
                antigensOtherThan("D");
                document.antigenForm.textField.value += "-antigen.   ";
            }
            else{
                document.antigenForm.textField.value += "If transfusion is necessary, " +  heOrShe(patientSexA) + " must receive" + sickle1(sicklePatient) + " extended crossmatch compatible Rh negative units that are also lacking the ";
                antigensOtherThan("D");
                document.antigenForm.textField.value += "-antigens.   ";
            };
                   if (document.antigenForm.warmAuto.checked) {  
            document.antigenForm.textField.value += "The Blood Bank will issue " + sickle1(sicklePatient) + "units that are compatible with the patient's plasma after the autoantibody is removed by adsorption with the patient's cells. ";
            };
         };
    };
            // Calculate percent of compatible units (Old function)
            //  for (i = 0; i < compUnitsA.length; i++) {
            //           percentCompatible = percentCompatible * compUnitsA[i] / 100;
            //       };
            //        percentCompatible = percentCompatible * 100;
            // Anti D subtracted from calculation if checked 
            //       if (document.antigenForm.antigen[0].checked === true) {
            //           percentCompatible = percentCompatible * 100 / document.antigenForm.compD.value;
            //       };
            // Anti Lea subtracted from calculation if checked       
            //        if (document.antigenForm.antigen[21].checked === true) {
            //            percentCompatible = percentCompatible * 100 / document.antigenForm.compLea.value;
            //        };
            // Anti Leb subtracted from calculation if checked       
            //        if (document.antigenForm.antigen[22].checked === true) {
            //            percentCompatible = percentCompatible * 100 / document.antigenForm.compLeb.value;
            //        };
            // Anti M subtracted from calculation if checked       
            //        if (document.antigenForm.antigen[15].checked === true) {
            //            percentCompatible = percentCompatible * 100 / document.antigenForm.compM.value;
            //        };
  // Function to display percent compatible units
    var percentCompatibleFunction = function () {       
        if (numberClinicalAntibodies > 0 && percentCompatible > 1) {
            if (document.antigenForm.antigen[0].checked == false) {
                document.antigenForm.textField.value += "Approximately " + percentCompatible.toFixed(0) + "% of donor units are expected to be compatible. ";
            }
            else if (numberAntibodies > 1) {
                document.antigenForm.textField.value += "Approximately " + percentCompatible.toFixed() + "% of Rh negative donor units are expected to be compatible. ";
            }
            else {
                document.antigenForm.textField.value += "";
            };
        };
        // Statement for compatible unit < 1%
        if (numberClinicalAntibodies > 0 && percentCompatible < 1) {
            document.antigenForm.textField.value += "Less than 1 percent of donor units are expected to be compatible; considerable time is needed to procure units for this patient. ";
        };
     };
  //  Signature line with time and date
    var signature = function() {
        document.antigenForm.textField.value += "\r\n";
        document.antigenForm.textField.value += "\r\n";
        document.antigenForm.textField.value += "Test interpretation and consult performed by:  ";
        document.antigenForm.textField.value += urlParams.listNames;
        document.antigenForm.textField.value += "\r\n";
            //  document.antigenForm.textField.value += "Note signed on " + currMonth + "/" + currDate + "/" + currYear + " at " + currHour + ":" + currMinute + " by ." + "\r\n";
       // document.antigenForm.textField.value += "Note signed by ." + "\r\n";
        document.antigenForm.textField.value += "This test was reviewed and approved by the signing pathologist." + "\r\n";
    };
            //    
            //   document.antigenForm.textField.value += "\r\n";
            //   document.antigenForm.textField.value += "\r\n";
// Run STANDARD REPORT
    presurgery2();
    if (patientPreSurgery != true) {
        patientHasAntibodies();
    };
//    patientHasAntibodies();
    patientTiters();
//    rhogamD();
    causeAndEffect();
    MAndOther();
    NAndOther();
    P1ndOther();
    warmAutoAntibody();
    strongWarmAutoAntibody();
    nonspecific();
    lewisGroup();
    lutheranGroup();
    patientMustReceive();
    percentCompatibleFunction();
    signature();

  //  document.antigenForm.textField.value += numberRhAntigens;
  //  document.antigenForm.textField.value += GivenRhImmuno;
            //  patient has D like due to immunoglobulins and other significant alloantibodies
            //  document.antigenForm.textField.value += "\r\n";   
            //    patientRemainingAntibodies("D");
//  SPECIAL CASES
//  Rh immunoglobulin D and other alloantibodies
    if (numberAntibodies > 1 && antigen[0].checked && document.antigenForm.RhImmuno.checked) {
        document.antigenForm.textField.value = "";
        presurgery2();
        if (patientPreSurgery != true) {
            patientHasAntibodies();
        };
        patientTiters();
        rhogamD();
        MAndOther();
        NAndOther();
        P1ndOther();
        if (numberClinicalAntibodies === 2) {
            document.antigenForm.textField.value += "The anti-";
            patientRemainingAntibodies("D");
            document.antigenForm.textField.value += " is likely a consequence of" + causeOfAntibody(patientSexA) + "and can cause" + consequenceAntibody(currentlyPregnant) + ". ";
        };
        if (numberClinicalAntibodies >= 3) {
            document.antigenForm.textField.value += "The anti-";
            patientRemainingAntibodies("D");
            document.antigenForm.textField.value += " are likely a consequence of" + causeOfAntibody(patientSexA) + "and can cause" + consequenceAntibody(currentlyPregnant) + ". ";
        };
        nonspecific();
        warmAutoAntibody();
        lewisGroup();
        lutheranGroup();
        patientMustReceive();
        percentCompatibleFunction();
        signature();
    };
 // Weak warm autoantibody with no alloantibodies
    if(document.antigenForm.warmAuto.checked && numberClinicalAntibodies === 0) {
        if(document.antigenForm.warmAutoStrength.value == "weakPosDAT") {
            document.antigenForm.textField.value = "";
            presurgery();
            document.antigenForm.textField.value += "This patient's antibody screen is negative but " + hisOrHer(patientSexA) + " red cells are coated with a warm autoantibody (positive DAT).  The autoantibody is weak and may not be causing hemolysis.  Clinical correlation is indicated. ";
            nonspecific();
            document.antigenForm.textField.value += "If transfusion is needed, " + heOrShe(patientSexA) + " will receive extended crossmatched compatible units. ";
            signature();
        };
        if(document.antigenForm.warmAutoStrength.value == "weakNegDAT") {
            document.antigenForm.textField.value = "";
            presurgery();
            document.antigenForm.textField.value += "The patient's serum contains a weak warm autoantibody (WAA). This WAA is only reactive in our most sensitive testing method. The DAT is negative; thus, this WAA is unlikely to cause hemolysis. The presence of common, clinically significant alloantibodies was ruled out. ";
            nonspecific();
            document.antigenForm.textField.value += "If transfusion is needed, " + heOrShe(patientSexA) + " will receive extended crossmatched compatible units. ";
            signature();
        };
    };
// Strong warm autoantibody with no alloantibodies
    if(document.antigenForm.warmAuto.checked && numberClinicalAntibodies === 0) {
        if(document.antigenForm.warmAutoStrength.value == "strong") {
            document.antigenForm.textField.value = "";
            presurgery();
            document.antigenForm.textField.value += "This patient has a strong warm autoantibody that is also coating " + hisOrHer(patientSexA) + " red blood cells (DAT is strongly positive). ";
            nonspecific();
            document.antigenForm.textField.value += "If transfusion is needed, " + heOrShe(patientSexA) + " requires units that have been extended crossmatched with " + hisOrHer(patientSexA) + " plasma from which the autoantibody has been adsorbed.  The risk of hemolysis post-transfusion is similar to the risk of " + hisOrHer(patientSexA) + " own cells to hemolyze. ";
            signature();
        };
    };
 // Anti-M, cold reacting with no additional alloantibodies
    if(numberAntibodies === 1 && antigen[15].checked) {
        document.antigenForm.textField.value = "";
        presurgery();
        document.antigenForm.textField.value += "This patient has anti-M. This antibody can be naturally occurring and does not react at body temperature; thus, it is not clinically significant.  ";
        nonspecific();
        document.antigenForm.textField.value += "If transfusion is necessary, " + heOrShe(patientSexA) + " will receive appropriate pre-warm extended crossmatch compatible units" + sickle2(sicklePatient) + ".  ";
        signature();
    };
 // Anti-N, cold reacting with no additional alloantibodies
    if(numberAntibodies === 1 && antigen[16].checked) {
        document.antigenForm.textField.value = "";
        presurgery();
        document.antigenForm.textField.value += "This patient has anti-N. This antibody typically does not react at body temperature; thus, it is not clinically significant.  ";
        nonspecific();
        document.antigenForm.textField.value += "If transfusion is necessary, " + heOrShe(patientSexA) + " will receive appropriate pre-warm extended crossmatch compatible units" + sickle2(sicklePatient) + ".  ";
        signature();
    };
    // Anti-P, cold reacting with no additional alloantibodies
    if(numberAntibodies === 1 && antigen[20].checked) {
        document.antigenForm.textField.value = "";
        presurgery();
        document.antigenForm.textField.value += "This patient has anti-P1. This antibody is a fairly common naturally-occurring antibody that does not cause transfusion reactions. If transfusion is necessary, " + heOrShe(patientSexA) + " will receive appropriate extended crossmatch compatible units" + sickle2(sicklePatient) + ".  ";
        signature();
    };
    // Anti-D, likely due to Rh immunoglobin administration
    if(numberAntibodies === 1 && antigen[0].checked && GivenRhImmuno === true) {
        document.antigenForm.textField.value = "";
        presurgery();
        document.antigenForm.textField.value += "The patient has anti-D, likely due to Rh immunoglobulin administration during this pregnancy.  If transfusion is necessary, the Blood Bank will issue" + sickle1(sicklePatient) + " extended crossmatch compatible Rh negative units to prevent sensitization to the D antigen.  ";
     //   presurgery();
   //     document.antigenForm.textField.value += "This patient has anti-M. This antibody can be naturally occurring and does not react at body temperature; thus, it is not clinically significant.  If transfusion is necessary, " + heOrShe(patientSexA) + " will receive appropriate pre-warm extended crossmatch compatible units. ";
        signature();
    };
        //
        // Anti D due to Rh immunoglobulin with no additional alloantibodies
        //   if (numberAntibodies === 1 && antigen[0].checked && document.antigenForm.RhImmuno.checked) {
        //       rhogamD();
        //      nonspecific();
        //  };
        //        document.antigenForm.textField.value = "";
        //       if(patientSexA === "female") {
        //            document.antigenForm.textField.value += "The anti-D alloantibody is likely due to Rh immunoglobulin administration during this pregnancy. ";
        //            document.antigenForm.textField.value += "If transfusion is necessary, the Blood Bank will issue extended crossmatch compatible Rh negative units to prevent sensitization to the D antigen. ";
        //        }
        //        else if(patientSexA==="male"){
        //            document.antigenForm.textField.value +="This patient has anti-D, likely due to Rh immunoglobulin administration in the last month to prevent Rh sensitization from platelet transfusions. "
        //            document.antigenForm.textField.value +="If red cell transfusion is necessary, the Blood Bank will issue extended crossmatch compatible Rh negative units. ";  
        //       }
        //       else{
        //           document.antigenForm.textField.value +="This patient has anti-D, likely due to Rh immunoglobulin administration. "
        //           document.antigenForm.textField.value +="If red cell transfusion is necessary, the Blood Bank will issue extended crossmatch compatible Rh negative units. ";    
        //        };    
        //   };
        //
        // Non-specific reactivity with no alloantibodies 
        //    if(document.antigenForm.nonspecificReactivity.checked  &&  numberAntibodies === 0) {
        //        document.antigenForm.textField.value = "";
        //        presurgery();
        //        document.antigenForm.textField.value += "The work-up showed non-specific reactivity.  All common clinically significant alloantibodies were ruled out with reagent red blood cells.  The positivity demonstrating in the patient's serum cannot be further characterized at this time.  Should this patient require transfusions in the future, extended crossmatch compatible units will be provided.  ";
        //    };
        //
   // U antigen 
    if(document.antigenForm.antigen[19].checked) {
        if(numberAntibodies === 1) {
            document.antigenForm.textField.value = "";
            presurgery();
            document.antigenForm.textField.value += "This workup identified anti-U in the patient's plasma.  This alloantibody is usually a consequence of" + causeOfAntibody(patientSexA);
            document.antigenForm.textField.value += "and can cause" + consequenceAntibody2(currentlyPregnant) + ".";
            document.antigenForm.textField.value += " Since the U antigen is present in 99.9% of the donors, if transfusion is anticipated, the Blood Bank needs to be notified immediately to order such rare units.";
            document.antigenForm.textField.value +=" It usually takes at least 24 hours to have U-negative units at UAB.  There are no other options for transfusion for this patient. ";
            signature();
        } else {
            document.antigenForm.textField.value = "";
            presurgery();
            document.antigenForm.textField.value += "This workup identified anti-U in the patient's plasma. ";
            patientAlsoHasAntibodies("U");
            document.antigenForm.textField.value += ".  These alloantibodies are usually a consequence of" + causeOfAntibody(patientSexA) + "and can cause" + consequenceAntibody2(currentlyPregnant);
            document.antigenForm.textField.value += ". "
            nonspecific();
            document.antigenForm.textField.value += "Since the U antigen is present in 99.9% of the donors, if transfusion is anticipated, the Blood Bank needs to be notified immediately to order such rare units.";
            document.antigenForm.textField.value += " It usually takes at least 24 hours to have U-negative units at UAB.  There are no other options for transfusion for this patient. ";
            signature();
        }
    };
  // Strong Warm autoantibody and single alloantibody
   if(document.antigenForm.warmAuto.checked && document.antigenForm.warmAutoStrength.value == "strong" && numberAntibodies == 1) {
        document.antigenForm.textField.value = "";
        presurgery();
        document.antigenForm.textField.value += "This patient has a warm autoantibody and anti-" + patientAntibodiesLongName[0] + ". The latter is an alloantibody and units for transfusion must lack the " + patientAntibodies[0] + " antigen.  The autoantibody is weak and probably not clinically significant.  However, it will react with all donor units. Thus, " + heOrShe(patientSexA) + " will receive units that are least incompatible with his plasma and he should be monitored for the small potential for hemolysis during and after the transfusion.  Considerable time is needed to crossmatch units for this patient. ";
        signature();
    };
  // Clear text box for special cases 
   if (patientSpecialCase===true) {
        document.antigenForm.textField.value = "";
    };
// Special case  f antibody
 if (document.antigenForm.specialOptions.value == "f" && patientSpecialCase===true){
    presurgery();
    document.antigenForm.textField.value += "This patient has anti-f. The f-antigen is found on RBC from donors who have both the c- and e-antigens encoded on the same allele (in cis). ";
    if(numberClinicalAntibodies >= 1){ 
         document.antigenForm.textField.value += "The patient also has anti-"; 
         patientRemainingAntibodies("dummy");
         document.antigenForm.textField.value += ". "; 
    };
    patientTiters();
    MAndOther();
    causeAndEffect();
    rhogamD();
    warmAutoAntibody();
    strongWarmAutoAntibody();
    nonspecific();
    lewisGroup();
    lutheranGroup();
    document.antigenForm.textField.value += "If transfusion is necessary, the patient will be provided with extended crossmatch compatible" + sickle1(sicklePatient) + " units lacking the c-antigen. ";
    percentCompatible=percentCompatible*0.20
    document.antigenForm.textField.value += "Approximately " + percentCompatible.toFixed(0) + "% of donor units are expected to be compatible. ";
    signature();
  };
// Special case  IH antibody
    if (document.antigenForm.specialOptions.value == "antiIH" && patientSpecialCase===true){
        presurgery();
        document.antigenForm.textField.value += "This patient has a cold antibody, which does not react at body temperature.  Thus, it is not clinically significant. ";
        if(numberClinicalAntibodies >= 1){
            document.antigenForm.textField.value += "The patient also has anti-";
            patientRemainingAntibodies("dummy");
            document.antigenForm.textField.value += ". ";
        };
        patientTiters();
        MAndOther();
        causeAndEffect();
        rhogamD();
        warmAutoAntibody();
        strongWarmAutoAntibody();
        nonspecific();
        lewisGroup();
        lutheranGroup();
        document.antigenForm.textField.value += "If transfusion is necessary, " + heOrShe(patientSexA) + " will be provided with pre-warmed extended " + sickle1(sicklePatient) + " units.  Such units will take considerable time to prepare.  ";
        if(numberClinicalAntibodies >= 1) {
            document.antigenForm.textField.value += "Approximately " + percentCompatible.toFixed(0) + "% of donor units are expected to be compatible. ";
        };
        signature();
    };
    // Special case  QNS antibody
    if (document.antigenForm.specialOptions.value == "QNS" && patientSpecialCase===true){
        presurgery();
        document.antigenForm.textField.value += "Additional sample is necessary to further characterize the reactivity demonstrating in the patient’s plasma.  At this point, the significance of this reactivity is unknown.  The work-up needs to be completed before fully crossmatched blood can be issued to the patient.  If " + heOrShe(patientSexA) + " needs RBC prior to resolution of the positive antibody screen, emergency release units will be provided with the appropriate physician signature.  ";
        signature();
    };
    // Special case  QNS antibody with patient discharged
    if (document.antigenForm.specialOptions.value == "QNSDischarged" && patientSpecialCase===true){
        presurgery();
        document.antigenForm.textField.value += "The current antibody screen is positive, however there was not enough sample submitted to the blood bank to complete the work-up for antibody identification.  Another sample was requested but the patient was already discharged.  ";
        signature();
    };
    // FLAGS
    if (antigen[18].checked && antigen[17].checked) {
        document.antigenForm.textField.value = "!!!  IS THE PATIENT S-s-? CONSIDER ANTI-U.  !!!! ";
    };
    if (patientSex[0].checked == '0'  &&  patientSex[1].checked == '0') {
            document.antigenForm.textField.value = "!!! PLEASE SELECT MALE OR FEMALE !!! ";
        };
    if (patientSex[0].checked  &&  patientSex[1].checked ) {
        document.antigenForm.textField.value = "!!! BOTH MALE AND FEMALE HAVE BEEN SELECTED !!! ";
    };
    if (antigen[1].checked  &&  antigen[3].checked ) {
        document.antigenForm.textField.value = "!!!  Anti-C and Anti-c are antithetical antigens !!! ";
    };
    if (antigen[2].checked  &&  antigen[4].checked ) {
        document.antigenForm.textField.value = "!!!  Anti-E and Anti-e are antithetical antigens !!! ";
    };
//
//                                 START Text Field 2
//
// Notes to pathologist; displayed in textField2
    document.antigenForm.textField2.value = "";
    document.antigenForm.textField2.value += "NOTE TO PATHOLOGIST:" + "\r\n";
//  Show calculation of percentage of compatible antibodies
    if (numberClinicalAntibodies > 1 && antigen[0].checked) {
        document.antigenForm.textField2.value += "Percentage Rh negative compatible units = ";
        compUnitsA.shift();
        patientClinicalAntibodies.shift();
       numberClinicalAntibodies = numberClinicalAntibodies - 1;
       }
       else {
         document.antigenForm.textField2.value += "Percentage of compatible units = ";  
       };
     for (i = 0; i < numberClinicalAntibodies; i += 1) {
            document.antigenForm.textField2.value += compUnitsA[i] / 100;
            document.antigenForm.textField2.value += " (" + patientClinicalAntibodies[i] + ")";
            if (i < numberClinicalAntibodies - 1) {
                document.antigenForm.textField2.value += " X ";
            }
            else {
                document.antigenForm.textField2.value += " X 100 = ";
            };
        };
      document.antigenForm.textField2.value += percentCompatibleOld + "%" + "\r\n";
    document.antigenForm.textField2.value += "Corrected value = ";
    document.antigenForm.textField2.value += percentCompatible + "%" + "\r\n";
    if (numberRhAntigens>1){
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "This patient has multiple Rh antigens.  The calculation of the percentage of donor compatible units has been adjusted to account for the prevalence of Rh phenotypes.  See table below (Adapted from Henry's 21st Edition page 629)"
        document.antigenForm.textField2.value += "\r\n";
      //  document.antigenForm.textField2.value += "\r\n";
       // document.antigenForm.textField2.value += "REACTN W/ ANTI     PHENOTYPE	GENOTYPE	   FREQUENCIES (Rh neg)";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "D  C  c  E  e DCE     Rh              DCE	   	";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "+  +  +  +  + DCcEe   R1R2        DCe/DcE     0.1176";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "                                  R1r''           DCe/cE      0.0084";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "                                  r'R2            Ce/DcE      0.0056 ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "+  +  +  -  + DCce        R1R0        DCe/Dce     0.0168 ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "                                  R1r	            DCe/ce	    0.3108 ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "+  -  +  +  + DcEe        R2R0        DcE/Dce     0.0112 ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "                                  R2r             DcE/ce      0.1035 ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "+  +  -  -  + DCe         R1R1        DCe/DCe     0.176";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "                                  R1r'            DCe/Ce      0.017 ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "+  -  +  +  - DcE         R2R2        DcE/DcE     0.02 ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "                                  R2r''           DcE/cE	    0.003 ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "+  -  +  -  +  Dce        R0R0        Dce/Dce     0.0016 ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "                                  R0r             Dce/ce      0.0296 ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "-  -  +  -  + ce              rr              ce/ce       0.1369 (0.9428)";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "-  +  +  -  + Cce         rr'             ce/Ce       0.0055 (0.0379)";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "-  -  +  +  + cEe         rr''            ce/cE       0.0028 (0.01928) ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "";
        document.antigenForm.textField2.value += "";
    };
         //   document.antigenForm.textField2.value += tempMatrix;
// Consider anti-G
    if (antigen[0].checked && antigen[1].checked && currentlyPregnant == true) {
        document.antigenForm.textField2.value = "";
        document.antigenForm.textField2.value += "!!!  Be sure to consider anti-G   !!!!";
        document.antigenForm.textField2.value += "\r\n" + "\r\n";
        document.antigenForm.textField2.value += "The G antigen is found on red cells possessing C or D.  Antibodies to G appear as anti-D and anti-C.  The antibody can be absorbed by D-C+ or D+C- red cells.  Anti-G can be distinguished from anti-C and anti-D by absorption and elution studies; however, this distinction is not usually necessary in most transfusion settings. Rarely,a D-C-G+ cell sample may be found. ";
        document.antigenForm.textField2.value += "\r\n" + "\r\n";
        document.antigenForm.textField2.value += "!!! It is important to provide Rh immunoglobulin to pregnant women with anti-G only !!!  ";
        document.antigenForm.textField2.value += "\r\n";
        document.antigenForm.textField2.value += "From Technical Manual 18th Ed. ";
    };
    // Special case  IH antibody
    if (document.antigenForm.specialOptions.value == "antiIH" && patientSpecialCase===true){
        document.antigenForm.textField2.value = "Anti-IH is a naturally-occurring antibody that does not typically cause hemolytic transfusion reactions or HDFN. If ABO-type specific blood is transfused, anti-IH can be ignored.";
        document.antigenForm.textField2.value += "";
        document.antigenForm.textField2.value += "\r\n" + "\r\n";
        document.antigenForm.textField2.value += "Anti-IH is an IgM cold agglutinin that reacts most strongly with group O, positive red cells. It is found most commonly in the serum of A1 people.  ";
        document.antigenForm.textField2.value += "\r\n" + "\r\n";
        document.antigenForm.textField2.value += "Compatible crossmatches can be obtained using ABO-type specific blood.  ";
        document.antigenForm.textField2.value += "\r\n";
    };
// Alerts for inappropriate selections
    if(patientSex[0].checked && patientSex[1].checked) {
        document.antigenForm.textField2.value += "!!!!Both MALE and FEMALE have been selected!!!!" + "\r\n";
    };
    if(patientSex[0].checked && pregnant.checked) {
        document.antigenForm.textField2.value += "???? Are you certain that the patient is a pregnant male?????"+"\r\n"
    };
    if(antigen[15].checked&&antigen[16].checked) {
    document.antigenForm.textField.value = "You have selected both M and N. M and N are antithetical antigens. "
    document.antigenForm.textField2.value += "You have selected both anti-M and anti-N. Case study?";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";

    }; 
// Function to randomize facts diplayed in textField2
var randomFact3=function(fact1,fact2,fact3){
    var factNumber = (Math.random()*3);
    factNumber=Math.floor(factNumber)+1;
    if(factNumber===1){
     document.antigenForm.textField2.value += fact1;   
    };
        if(factNumber===2){
     document.antigenForm.textField2.value += fact2; 
    };
            if(factNumber===3){
     document.antigenForm.textField2.value += fact3;
    };
    };
// Non-specific Reactivity note
  if(document.antigenForm.nonspecificReactivity.checked) {
      document.antigenForm.textField2.value += "The work-up showed non-specific reactivity.  Check to see if ficin treated cells were used in the workup.  ";
   };
// Anti-D Pathologist notes
if(antigen[0].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-C Pathologist notes
if(antigen[1].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-E Pathologist notes
if(antigen[2].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-c Pathologist notes
if(antigen[3].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-e Pathologist notes
if(antigen[4].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-K Pathologist notes
if(antigen[5].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Kpa Pathologist notes
if(antigen[6].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Jsa Pathologist notes
if(antigen[7].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-k Pathologist notes
if(antigen[8].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Kpb Pathologist notes
if(antigen[9].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Jsb Pathologist notes
if(antigen[10].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Fya Pathologist notes
if(antigen[11].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Fyb Pathologist notes
if(antigen[12].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Jka Pathologist notes
if(antigen[13].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Jkb Pathologist notes
if(antigen[14].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-M Pathologist notes
if(antigen[15].checked) {
    document.antigenForm.textField2.value += "Although anti-M is typically cold reacting and not clincinally significant, anti-M which reacts at 37 degrees Celsius may be clinically significant and may case hemolytic disease of the fetus and newborn (HDFN).";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "MNS group antigens are inactivated by proteolytic enzymes (such as ficin, papain, trypsin, and bromelin";
    var MFact2="Anti-M and anti-N both show dosage effects."
    var MFact3="Anti-M and anti-N are found on a glycoprotein (glycophorin A).  These antigens are present at birth."
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-N Pathologist notes
if(antigen[16].checked) {
    document.antigenForm.textField2.value += "Anti-N is typically cold reacting and is not clinically significant unless it reacts at 37 degrees Celsius.  Anti-N rarely causes mild hemolytic disease of the fetus and newborn (HDFN).";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "MNS group antigens are inactivated by proteolytic enzymes (such as ficin, papain, trypsin, and bromelin).";
    var MFact2="Anti-M and anti-N both show dosage effects. Anti-N is less common than anti-M."
    var MFact3="Anti-M and anti-N are found on a glycoprotein (glycophorin A).  These antigens are present at birth."
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Lea Pathologist notes
if(antigen[21].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Lea Pathologist notes
if(antigen[22].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
};

function sickleAlert (){
    alert("Include phenotype matching requirments!");
    processForm();
};

