function processForm() {
    var antibodies = ["D", "C", "E", "c", "e", "K", "Kpa", "Jsa", "k", "Kpb", "Jsb", "Fya", "Fyb", "Jka", "Jkb", "M", "N", "S", "s", "U", "P", "Lea", "Leb", "Lua", "Lub"];
    var antibodiesLongName = ["D", "C", "E", "c", "e", "K", "Kpa", "Jsa", "k", "Kpb", "Jsb", "Fya", "Fyb", "Jka", "Jkb", "M", "N", "S", "s", "U", "P", "Lewis A", "Lewis B", "Lutheran A", "Lutheran B"];
    var i, percentComp;
    percentComp = [];
    for(i = 0; i < antibodies.length; i += 1) {
        percentComp[i] = document.antigenForm['comp' + antibodies[i]].value;
    };
    //  var percentComp = [document.antigenForm.compD.value, document.antigenForm.compC.value, document.antigenForm.compE.value, document.antigenForm.compc.value, document.antigenForm.compe.value, document.antigenForm.compK.value, document.antigenForm.compKpa.value, document.antigenForm.compJsa.value, document.antigenForm.compk.value, document.antigenForm.compKpb.value, document.antigenForm.compJsb.value, document.antigenForm.compFya.value, document.antigenForm.compFyb.value, document.antigenForm.compJka.value, document.antigenForm.compJkb.value, document.antigenForm.compM.value, document.antigenForm.compN.value, document.antigenForm.compN.value, document.antigenForm.compS.value, document.antigenForm.comps.value, document.antigenForm.compU.value,  document.antigenForm.compP.value, document.antigenForm.compLea.value, document.antigenForm.compLeb.value, document.antigenForm.compLua.value, document.antigenForm.compLub.value];
    var tempMatrix = new Array();
    var tempMatrix2 = new Array();
    var patientAntibodies = new Array();
    var patientAntibodiesLongName = new Array();
    var compUnitsA = new Array();
    var antigen = document.antigenForm.antigen;
    var patientSex = document.antigenForm.patientSex;
    var pregnant = document.antigenForm.pregnant;
    var tempNumberAntibodies = document.antigenForm.tempNumberAntibodies;
    var preSurgery = document.antigenForm.preSurgery;
    var patientPreSurgery;
    var compUnits = new Array();
    var percentCompatible = 1;
    var patientSexA = 0;
    var currentlyPregnant = false;
    var numberAntibodies = 0;
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
    var consequenceAntibody = function(currentlyPregnant) {
        if(currentlyPregnant == false) {
            return " a hemolytic transfusion reaction";
        }
        else if(currentlyPregnant == true) {
            return " hemolytic disease of the newborn";
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

        }
    };
    //
    if(pregnant.checked) {
        currentlyPregnant = true;
    };
    //
    if(preSurgery.checked) {
        patientPreSurgery = true;
    };
    // Reset text area
    document.antigenForm.textField.value = "";
    if(patientAntibodies.length === 0) {
        document.antigenForm.textField.value = "";
    };
    // Populate antibody drop down for titer  http://jsfiddle.net/nExgJ/
    //dropdown.add(new Option(patientAntibodies[0], "U"), "1");
    //var dropdown = document.antigenForm.selectAntibody1;
    // Loop through the array
    //if(numberAntibodies>0){
    //   for (i = 0; i < patientAntibodies.length; ++i) {
    //   Append the element to the end of Array list
    //       dropdown[dropdown.length] = new Option(patientAntibodies[i], patientAntibodies[i]);
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
    // Surgical patient
    var presurgery = function() {
        if(patientPreSurgery === true) {
            document.antigenForm.textField.value += "The blood bank needs a new sample within 3 days of surgery because the patient has reactivity against red cell antigens. ";
        };
    }
    //  Patient with antibodies; functions definition
    var patientHasAntibodies = function() {
        if(patientAntibodies.length >= 1) {
            presurgery();
            document.antigenForm.textField.value += "The patient has anti-" + conjoin(patientAntibodiesLongName) + " alloantibodies. ";
        };
    };
    // Run function
    patientHasAntibodies();

    // Provides sentence if patient has additional antibodies in a special case
    var patientAlsoHasAntibodies = function(m) {
        if(patientAntibodies.length > 1) {
            //            presurgery();
            var count = 0;
            var alsoHasAntibodies = new Array();
            for(i = 0; i < patientAntibodies.length; i += 1) {
                if(patientAntibodies[i] != m) {
                    alsoHasAntibodies[count] = patientAntibodiesLongName[i];
                    count += 1;
                };
            }
            document.antigenForm.textField.value += "The patient also has anti-" + conjoin(alsoHasAntibodies) + " alloantibodies. ";
        };
    };

    // Antibody titers (up to 2 titers)
    var patientTiters = function() {
        if(document.antigenForm.antTiter1.checked) {
            if(document.antigenForm.antTiter1.checked && document.antigenForm.antTiter2.checked) {
                document.antigenForm.textField.value += "The patient has anti-" + document.antigenForm.selectAntibody1.value + " antibodies at a titer of " + document.antigenForm.titer1.value + " and anti-" + document.antigenForm.selectAntibody2.value + " antibodies at a titer of " + document.antigenForm.titer2.value + ". ";
            }
            else {
                document.antigenForm.textField.value += "The patient has anti-" + document.antigenForm.selectAntibody1.value + " antibodies at a titer of " + document.antigenForm.titer1.value + ". ";
            }
        };
    }
    patientTiters();
    // Anti D and pregnancy with history of Rh immunoglobulin   
    if(numberAntibodies > 1 && antigen[0].checked && document.antigenForm.RhImmuno.checked) {
        document.antigenForm.textField.value += "The anti-D alloantibody is likely due to Rh immunoglobulin administration during this pregnancy. ";
    };

    // Anti-M and one or more alloantibody
    if(numberAntibodies > 1 && antigen[15].checked) {
        document.antigenForm.textField.value += "Anti-M can be naturally occurring and does not react at body temperature; thus, it is not clinically significant. ";
    }
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
    if(numberAntibodies === 1) {
        document.antigenForm.textField.value += "This antibody is usually a consequence of" + causeOfAntibody(patientSexA) + "and can cause" + consequenceAntibody(currentlyPregnant) + ". ";
    };
    if(numberAntibodies >= 2) {
        document.antigenForm.textField.value += "These antibodies are usually a consequence of" + causeOfAntibody(patientSexA) + "and can cause" + consequenceAntibody(currentlyPregnant) + ". ";
    };

    // Warm autoantibody with no alloantibodies
    if(document.antigenForm.warmAuto.checked && numberAntibodies === 0) {
        if(document.antigenForm.warmAutoStrength.value == "weak") {
            document.antigenForm.textField.value += "The patient's antibody screen is negative but " + hisOrHer(patientSexA) + " red cells are coated with a warm autoantibody (positive DAT).  The autoantibody is weak and may not be causing hemolysis.  Clinical correlation is indicated. If transfusion is needed, " + heOrShe(patientSexA) + " will receive extended crossmatched compatible units. "
        }
    };

    // Warm autoantibody and one or more alloantibodies
    if(document.antigenForm.warmAuto.checked && numberAntibodies >= 1) {
        if(document.antigenForm.warmAutoStrength.value == "weak") {
            document.antigenForm.textField.value += "There is also a weak warm autoantibody coating the patient's red blood cells (weak positive DAT).  This autoantibody is probably not clinically significant. If transfusion is needed, the Blood Bank will issue units that are compatible with the patient's plasma where the antibody was removed by adsorption with the patient's cells. "
        }
    }
    // Specify type of units patient will receive; antigen[0] specifies D
    if(patientSexA != 0 && numberAntibodies >= 1) {
        if(document.antigenForm.antigen[0].checked == false) {
            document.antigenForm.textField.value += "If transfusion is necessary, the patient must receive extended crossmatch compatible " + conjoinB(patientAntibodies) + "-antigen negative units. ";
        }
        else {
            document.antigenForm.textField.value += "If transfusion is necessary, the patient must receive appropriate extended crossmatch compatible units. ";
        };
    };

    // Calculate percent of compatible units
    for(i = 0; i < compUnitsA.length; i++) {
        percentCompatible = percentCompatible * compUnitsA[i] / 100;
    };
    percentCompatible = percentCompatible * 100;
    // Anti D subtracted from calculation if checked 
    if(document.antigenForm.antigen[0].checked === true) {
        percentCompatible = percentCompatible * 100 / document.antigenForm.compD.value;
    }
    // Display percent compatible units
    if(numberAntibodies > 0 && percentCompatible > 1) {
        if(document.antigenForm.antigen[0].checked == false) {
            document.antigenForm.textField.value += "Approximately " + percentCompatible.toFixed(0) + "% of donor units are expected to be compatible. ";
        }
        else if(numberAntibodies > 1) {
            document.antigenForm.textField.value += "Approximately " + percentCompatible.toFixed() + "% of Rh negative donor units are expected to be compatible. ";
        }
        else {
            document.antigenForm.textField.value += "";
        }
        ;
    };
    // Statement for compatible unit < 1%
    if(numberAntibodies > 0 && percentCompatible < 1) {
        document.antigenForm.textField.value += "Less than 1 percent of donor units are expected to be compatible; considerable time is needed to procure units for this patient. ";
    };
    //
    // Special cases
    //
    // Anti-M, cold reacting with no additional alloantibodies
    if(numberAntibodies === 1 && antigen[15].checked) {
        document.antigenForm.textField.value = "";
        presurgery();
        document.antigenForm.textField.value += "This patient has anti-M. This antibody can be naturally occurring and does not react at body temperature; thus, it is not clinically significant.  If transfusion is necessary, " + heOrShe(patientSexA) + " will receive appropriate pre-warm extended crossmatch compatible units. ";
    };
    //
    // Anti D due to Rh immunoglobulin
    if(numberAntibodies === 1 && antigen[0].checked && document.antigenForm.RhImmuno.checked) {
        document.antigenForm.textField.value = "";
        document.antigenForm.textField.value += "This patient has anti-D, likely due to Rh immunoglobulin administration during this pregnancy.  If transfusion is necessary, the Blood Bank will issue extended crossmatch compatible Rh negative units to prevent sensitization to the D antigen. ";
    };
    //
    // Non-specific reactivity with no alloantibodies 
    if(document.antigenForm.nonspecificReactivity.checked) {
        document.antigenForm.textField.value = "";
        presurgery();
        document.antigenForm.textField.value += "The work-up showed non-specific reactivity.  All common clinically significant alloantibodies were ruled out with reagent red blood cells.  The positivity demonstrating in the patient's serum cannot be further characterized at this time.  Should this patient require transfusions in the future, extended crossmatch compatible units will be provided.  ";
    };
    //
    // U antigen in a pregnant patients
    if(document.antigenForm.antigen[19].checked && currentlyPregnant === true) {
        if(numberAntibodies === 1) {
            document.antigenForm.textField.value = "";
            presurgery();
            document.antigenForm.textField.value += "This workup identified anti-U in the patient's plasma.  This alloantibody is usually a consequence of" + causeOfAntibody(patientSexA) + "and can cause hemolytic disease of the newborn or a transfusion reaction.  Since the U antigen is present in 99.9% of the donors, if transfusion is anticipated, the Blood Bank needs to be notified immediately to order such rare units. It usually takes at least 24 hours to have U-negative units at UAB.  There are no other options for transfusion for this patient. ";
        } else {
            document.antigenForm.textField.value = "";
            presurgery();
            document.antigenForm.textField.value += "This workup identified anti-U in the patient's plasma. ";
            patientAlsoHasAntibodies("U");
            document.antigenForm.textField.value += "These alloantibodies are usually a consequence of" + causeOfAntibody(patientSexA) + "and can cause hemolytic disease of the newborn or a transfusion reaction.  Since the U antigen is present in 99.9% of the donors, if transfusion is anticipated, the Blood Bank needs to be notified immediately to order such rare units. It usually takes at least 24 hours to have U-negative units at UAB.  There are no other options for transfusion for this patient. ";
        }
    };
    // U antigen in a non-pregnant patients
    if(document.antigenForm.antigen[19].checked && currentlyPregnant === false) {
        if(numberAntibodies === 1) {
            document.antigenForm.textField.value = "";
            presurgery();
            document.antigenForm.textField.value += "This workup identified anti-U in the patient's plasma.  This alloantibody is usually a consequence of" + causeOfAntibody(patientSexA) + "and can cause a transfusion reaction.  Since the U antigen is present in 99.9% of the donors, if transfusion is anticipated, the Blood Bank needs to be notified immediately to order such rare units. It usually takes at least 24 hours to have U-negative units at UAB.  There are no other options for transfusion for this patient. ";
        } else {
            document.antigenForm.textField.value = "";
            presurgery();
            document.antigenForm.textField.value += "This workup identified anti-U in the patient's plasma. ";
            patientAlsoHasAntibodies("U");
            document.antigenForm.textField.value += "These alloantibodies are usually a consequence of" + causeOfAntibody(patientSexA) + "and can cause a transfusion reaction.  Since the U antigen is present in 99.9% of the donors, if transfusion is anticipated, the Blood Bank needs to be notified immediately to order such rare units. It usually takes at least 24 hours to have U-negative units at UAB.  There are no other options for transfusion for this patient. ";
        }
    };
    // 
    // Warm autoantibody and single alloantibody
    if(document.antigenForm.warmAuto.checked && numberAntibodies == 1) {
        document.antigenForm.textField.value = "";
        presurgery();
        document.antigenForm.textField.value += "This patient has a warm autoantibody and " + patientAntibodies[0] + ". The latter is an alloantibody and units for transfusion must lack the " + patientAntibodies[0] + " antigen.  The autoantibody is weak and probably not clinically significant.  However, it will react with all donor units. Thus, " + heOrShe(patientSexA) + " will receive units that are least incompatible with his plasma and he should be monitored for the small potential for hemolysis during and after the transfusion.  Considerable time is needed to crossmatch units for this patient.";
    };
    //    
    //  Signature line with time and date
    document.antigenForm.textField.value += "\r\n";
    document.antigenForm.textField.value += "\r\n";
    document.antigenForm.textField.value += "Test interpretation and consult performed by:" + "\r\n";
    document.antigenForm.textField.value += "Note signed on " + currMonth + "/" + currDate + "/" + currYear + " at " + currHour + ":" + currMinute + " by .";
    //
    //
    // Notes to pathologist; displayed in textField2
    document.antigenForm.textField2.value = "";
    document.antigenForm.textField2.value += "NOTE TO PATHOLOGIST:" + "\r\n";
    //   document.antigenForm.textField2.value += tempMatrix
    //
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
// Function to randomized facts diplayed in textField2
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
// Anti-D Pathologist notes
if(antigen[1].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-C Pathologist notes
if(antigen[2].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-E Pathologist notes
if(antigen[3].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-c Pathologist notes
if(antigen[4].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-e Pathologist notes
if(antigen[5].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-K Pathologist notes
if(antigen[6].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Kpa Pathologist notes
if(antigen[7].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-Jsa Pathologist notes
if(antigen[8].checked) {
    document.antigenForm.textField2.value += "";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "";
    var MFact2=""
    var MFact3=""
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-M Pathologist notes
if(antigen[15].checked) {
    document.antigenForm.textField2.value += "Although anti-M is typically cold reacting and not clincinally significant, anti-M which reacts at 37 degrees Celsius may be clinically significant and may case hemolytic disease of the newborn (HDN).";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "MNS group antigens are inactivated by proteolytic enzymes (such as ficin, papain, trypsin, and bromelin";
    var MFact2="Anti-M and anti-N both show dosage effects."
    var MFact3="Anti-M and anti-N are found on a glycoprotein (glycophorin A).  These antigens are present at birth."
    randomFact3(MFact1, MFact2, MFact3);
}; 
// Anti-N Pathologist notes
if(antigen[16].checked) {
    document.antigenForm.textField2.value += "Anti-N is typically cold reacting and is not clinically significant unless it reacts at 37 degrees Celsius.  Anti-N rarely causes mild disease of the newborn (HDN).";
    document.antigenForm.textField2.value += "\r\n" + "\r\n";
    var MFact1 = "MNS group antigens are inactivated by proteolytic enzymes (such as ficin, papain, trypsin, and bromelin).";
    var MFact2="Anti-M and anti-N both show dosage effects. Anti-N is less common than anti-M."
    var MFact3="Anti-M and anti-N are found on a glycoprotein (glycophorin A).  These antigens are present at birth."
    randomFact3(MFact1, MFact2, MFact3);
}; 
};


