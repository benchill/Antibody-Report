function processForm() {  
    var antibodies = ["D", "C", "E", "c", "e", "K", "Kpa", "Jsa", "k", "Kpb", "Jsb", "Fya", "Fyb", "Jka", "Jkb", "M", "N", "S", "s", "U", "P", "Lea", "Leb", "Lua", "Lub"];
    var i, percentComp;
    percentComp = [];
    for(i = 0; i < antibodies.length; i += 1) {
        percentComp[i] = document.antigenForm['comp' + antibodies[i]].value;
    }
    //  var percentComp = [document.antigenForm.compD.value, document.antigenForm.compC.value, document.antigenForm.compE.value, document.antigenForm.compc.value, document.antigenForm.compe.value, document.antigenForm.compK.value, document.antigenForm.compKpa.value, document.antigenForm.compJsa.value, document.antigenForm.compk.value, document.antigenForm.compKpb.value, document.antigenForm.compJsb.value, document.antigenForm.compFya.value, document.antigenForm.compFyb.value, document.antigenForm.compJka.value, document.antigenForm.compJkb.value, document.antigenForm.compM.value, document.antigenForm.compN.value, document.antigenForm.compN.value, document.antigenForm.compS.value, document.antigenForm.comps.value, document.antigenForm.compU.value,  document.antigenForm.compP.value, document.antigenForm.compLea.value, document.antigenForm.compLeb.value, document.antigenForm.compLua.value, document.antigenForm.compLub.value];
    var tempMatrix= new Array();
    var patientAntibodies=new Array();
    var compUnitsA = new Array();
    var antigen = document.antigenForm.antigen;
    var patientSex=document.antigenForm.patientSex;
    var pregnant = document.antigenForm.pregnant;
    var tempNumberAntibodies = document.antigenForm.tempNumberAntibodies;
    var preSurgery = document.antigenForm.preSurgery;
    var patientPreSurgery;
    var compUnits = new Array();
    var percentCompatible = 1;
    var patientSexA=0;
    var currentlyPregnant = false;
    var numberAntibodies=0;
    var n=0;
 // setup time and date format    
    var now = new Date();
    var currDate = now.getDate();
    var currMonth = now.getMonth() + 1;
    var currYear = now.getFullYear();
    var currHour = now.getHours();
    var currMinute = now.getMinutes();
    if (currMinute<10)
        {
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

// from Sean W.
        conjoin = function (x) {
     // This function joins the elements of an array using the "Oxford comma".
        if ((x instanceof Array) === false) {
            throw new TypeError('Argument must be an array.');
        }
        if (x.length < 3) {
            return x.join(' and anti-');
        }
        return x.slice(0, -1).join(', anti-') + ', and anti-' + x.slice(-1);
    };
        conjoinB = function (x) {
     // This function joins the elements of an array using the "Oxford comma".
        if ((x instanceof Array) === false) {
            throw new TypeError('Argument must be an array.');
        }
        if (x.length < 3) {
            return x.join('- and ');
        }
        return x.slice(0, -1).join('-, ') + '-, and ' + x.slice(-1);
    };

    for(i=0;i<antibodies.length;i++)
   {
//       matrix[i]="comp"+antibodies[i];
        tempMatrix[i]=0;
        compUnits[i] = 0;
  //      comp[i] = "comp" + antibodies[i];
       if(antigen[i].checked)
          {
  
              tempMatrix[i] = antibodies[i];
              compUnits[i] = percentComp[i];

          }; 

    };
    for(i=0;i<antibodies.length;i++)
    {
        if(tempMatrix[i]!=0)
        {
            patientAntibodies.push(tempMatrix[i]);
            compUnitsA.push(percentComp[i]);
            numberAntibodies += 1;
        
        }
    };

    if(pregnant.checked)
    {
        currentlyPregnant = true;
    };
    if(preSurgery.checked)
    {
        patientPreSurgery = true;
    };
    document.antigenForm.textField.value = "";
    if(patientAntibodies.length === 0) 
    {
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
function removeAllOptions(x)
    {
        var i;
        for(i=x.options.length-1;i>=0;i--)
        {
            x.remove(i);
        }
    };
//for(i = 0; i<numberAntibodies; i += 1) {
//    document.antigenForm.selectAntibody1.selected
//}
//    document.antigenForm.tempNumberAntibodies.value = numberAntibodies;

if(tempNumberAntibodies.value!=numberAntibodies)
    {
        var dropdown1 = document.getElementById("selectAntibody1");
        var dropdown2 = document.getElementById("selectAntibody2");
        removeAllOptions(dropdown1);
        removeAllOptions(dropdown2);
        for(i = 0; i<numberAntibodies; i += 1) {
            dropdown1.add(new Option(patientAntibodies[i], patientAntibodies[i]), i.toString);
            dropdown2.add(new Option(patientAntibodies[i], patientAntibodies[i]), i.toString);
        }
document.antigenForm.tempNumberAntibodies.value = numberAntibodies;
};   
 //     }​;
 //  };
//document.antigenForm.textField.value +=dropdown
//
// Surgical patient
var presurgery = function()
   {
       if(patientPreSurgery===true)
    {
           document.antigenForm.textField.value += "The blood bank needs a new sample within 3 days of surgery because the patient has reactivity against red cell antigens. "; 
    };
    }

 //   if(document.antigenForm.antTiter1.checked && numberAntibodies===1)
//    {
//        
//         document.antigenForm.textField.value+="The patient has anti-"+patientAntibodies+" antibodies at a titer of " + document.antigenForm.titer1.value +". ";
//    }
//    else 
    if(patientAntibodies.length >= 1) 
    {
        presurgery();
        document.antigenForm.textField.value += "The patient has anti-"+conjoin(patientAntibodies)+" alloantibodies. ";
    };
    if(document.antigenForm.antTiter1.checked)
    {
        if(document.antigenForm.antTiter1.checked && document.antigenForm.antTiter2.checked) 
        {
           document.antigenForm.textField.value += "The patient has anti-" + document.antigenForm.selectAntibody1.value + " antibodies at a titer of " + document.antigenForm.titer1.value + " and anti-" + document.antigenForm.selectAntibody2.value + " antibodies at a titer of " + document.antigenForm.titer2.value +". ";
        }
        else {
            document.antigenForm.textField.value += "The patient has anti-" + document.antigenForm.selectAntibody1.value + " antibodies at a titer of " + document.antigenForm.titer1.value + ". ";
        }
    };
// Anti D and pregnancy with history or Rh immunoglobulin   
    if(numberAntibodies>1 && antigen[0].checked && document.antigenForm.RhImmuno.checked)
    {
          document.antigenForm.textField.value += "The anti-D alloantibody is likely due to Rh immunoglobulin administration during this pregnancy. "; 
    };
// Anti-M and one or more alloantibody
    if(numberAntibodies>1 && antigen[15].checked)
    {
            document.antigenForm.textField.value += "Anti-M can be naturally occurring and does not react at body temperature; thus, it is not clinically significant. "; 
    }
//    if(patientAntibodies.length === 2) 
//    {
//        document.antigenForm.textField.value = "The patient has anti-"+patientAntibodies[0]+" and anti-"+ patientAntibodies[1] + " alloantibodies. ";
//    };
//    if(patientAntibodies.length === 3) 
//    {
//        document.antigenForm.textField.value = "The patient has anti-"+patientAntibodies[0]+ ", anti-"+patientAntibodies[1]+", and anti-"+ patientAntibodies[2] + " alloantibodies. ";
//    };
//    if(patientAntibodies.length === 4) 
//    {
//        document.antigenForm.textField.value = "The patient has anti-"+patientAntibodies[0]+ ", anti-"+patientAntibodies[1]+", anti-"+patientAntibodies[2]+", and anti-"+ patientAntibodies[3] + " alloantibodies. ";
//    };
//    document.antigenForm.textField.value+="test";
    
    for(i = 0; i < 2;i++)
   {
       if(patientSex[i].checked) 
       {
           patientSexA = patientSex[i].value;
        };
    };
//        document.antigenForm.textField.value+=patientSexA;
    if(patientSexA=== 'male')
    {
        currentlyPregnant = false;
    }
    if(patientSexA === 'male' && numberAntibodies===1) 
    {
        document.antigenForm.textField.value+="This alloantibody is usually a consequence of previous transfusion and can cause a hemolytic transfusion reaction. ";
    };   
    if(patientSexA === 'male' && numberAntibodies>=2) 
    {
        document.antigenForm.textField.value+="These alloantibodies are usually a consequence of previous transfusion and can cause a hemolytic transfusion reaction. ";
    };
    if(patientSexA === 'female' && numberAntibodies===1) 
    {
        if(currentlyPregnant === true) 
        {
            document.antigenForm.textField.value+="This alloantibody is usually a consequence of previous transfusion or pregnancy and can cause hemolytic disease of the newborn. ";
         }          
        else
        {
            document.antigenForm.textField.value+="This alloantibody is usually a consequence of previous transfusion or pregnancy and can cause a hemolytic transfusion reaction. ";
        };
    };   
    if(patientSexA === 'female' && numberAntibodies>=2) 
    {
        if(currentlyPregnant === true) 
        {
            document.antigenForm.textField.value += "These alloantibodies are usually a consequence of previous transfusion or pregnancy and can cause hemolytic disease of the newborn. ";
        }
        else 
        {
            document.antigenForm.textField.value += "These alloantibodies are usually a consequence of previous transfusion or pregnancy and can cause a hemolytic transfusion reaction. ";
        };  
    };
    // Warm autoantibody with no alloantibodies
    if(document.antigenForm.warmAuto.checked && numberAntibodies === 0)
    {
        if(document.antigenForm.warmAutoStrength.value == "weak") {
            document.antigenForm.textField.value += "The patient's antibody screen is negative but " + hisOrHer(patientSexA) + " red cells are coated with a warm autoantibody (positive DAT).  The autoantibody is weak and may not be causing hemolysis.  Clinical correlation is indicated. If transfusion is needed, " + heOrShe(patientSexA) + " will receive extended crossmatched compatible units. "
        }
    };
    // Warm autoantibody and one or more alloantibodies
    if(document.antigenForm.warmAuto.checked && numberAntibodies >= 1)
    {
        if(document.antigenForm.warmAutoStrength.value =="weak")
        {
            document.antigenForm.textField.value +="There is also a weak warm autoantibody coating the patient's red blood cells (weak positive DAT).  This autoantibody is probably not clinically significant. If transfusion is needed, the Blood Bank will issue units that are compatible with the patient's plasma where the antibody was removed by adsorption with the patient's cells. "
        }
    }

    if(patientSexA !=0 && numberAntibodies>=1) 
    {
        if(document.antigenForm.antigen[0].checked==false)
        {
              document.antigenForm.textField.value+="If transfusion is necessary, the patient will receive extended crossmatch compatible " + conjoinB(patientAntibodies)+ "-antigen negative units. ";
        }
        else
        {
              document.antigenForm.textField.value+="If transfusion is necessary, the patient will receive appropriate extended crossmatch compatible units. ";
        }; 
        };
         
     
//        if(patientSexA !=0 && numberAntibodies===2) 
//    {
//        document.antigenForm.textField.value+="If transfusion is necessary, the patient will receive extended crossmatch compatible " +patientAntibodies[0]+"- and "+patientAntibodies[1] +"-antigen negative units. ";
//    }; 
//    if(patientSexA !=0 && numberAntibodies===3) 
//    {
//        document.antigenForm.textField.value+="If transfusion is necessary, the patient will receive extended crossmatch compatible " +patientAntibodies[0]+"-, "+patientAntibodies[1]+"- and "+patientAntibodies[2] +"-antigen negative units. ";
//    };   
//    if(patientSexA !=0 && numberAntibodies===4) 
//    {
//        document.antigenForm.textField.value+="If transfusion is necessary, the patient will receive extended crossmatch compatible " + patientAntibodies[0]+"-, "+ patientAntibodies[1]+"-, "+patientAntibodies[2]+"- and "+patientAntibodies[3] +"-antigen negative units. ";
//    };   
 //     document.antigenForm.textField.value += "test1"; 
//
// Calculate percent of compatible units
    for(i = 0; i < compUnitsA.length;i++ )
    {
        percentCompatible = percentCompatible * compUnitsA[i]/100;
    };
    percentCompatible = percentCompatible * 100;
// Display percent compatible units; Anti-D not used in calculation for >1%
    if(numberAntibodies>0 && percentCompatible>1) 
    {
        if(document.antigenForm.antigen[0].checked==false)
        {
              document.antigenForm.textField.value+="Approximately "+percentCompatible.toFixed(0)+"% of donor units are expected to be compatible. ";
        }
        else
        {
              document.antigenForm.textField.value+="Approximately "+((percentCompatible)/document.antigenForm.compD.value*100).toFixed()+"% of Rh negative donor units are expected to be compatible. ";;
        };     
    };
// Statement for compatible unit < 1%
    if(numberAntibodies>0 && percentCompatible<1) 
    {
        document.antigenForm.textField.value+="Less than 1 percent of donor units are expected to be compatible; considerable time is needed to procure units for this patient. ";
    };
//
// Special cases
//
// Anti-M, cold reacting with no additional alloantibodies
    if(numberAntibodies===1 && antigen[15].checked)
    {
           document.antigenForm.textField.value = "";
           document.antigenForm.textField.value = "This patient has anti-M. This antibody can be naturally occurring and does not react at body temperature; thus, it is not clinically significant.  If transfusion is necessary, "+heOrShe(patientSexA)+" will receive appropriate pre-warm extended crossmatch compatible units. "; 
    };
//
// Anti D due to Rh immunoglobulin
    if(numberAntibodies===1 && antigen[0].checked && document.antigenForm.RhImmuno.checked)
    {
           document.antigenForm.textField.value = "";
           document.antigenForm.textField.value = "This patient has anti-D, likely due to Rh immunoglobulin administration during this pregnancy.  If transfusion is necessary, the Blood Bank will issue extended crossmatch compatible Rh negative units to prevent sensitization to the D antigen. "; 
    };
//
// Non-specific reactivity with no alloantibodies 
    if(document.antigenForm.nonspecificReactivity.checked)
    {
           document.antigenForm.textField.value = "";
           document.antigenForm.textField.value += "The work-up showed non-specific reactivity.  All common clinically significant alloantibodies were ruled out with reagent red blood cells.  The positivity demonstrating in the patient's serum cannot be further characterized at this time.  Should this patient require transfusions in the future, extended crossmatch compatible units will be provided.  "; 
    };
//
// U antigen in a non-pregnant patients
    if(document.antigenForm.antigen[19].checked && currentlyPregnant===false)
    {
           document.antigenForm.textField.value = "";
           presurgery();
           document.antigenForm.textField.value += "This workup identified anti-U in the patient's plasma.  This alloantibody is usually a consequence of previous transfusion or pregnancy and can cause hemolytic disease of the newborn or a transfusion reaction.  Since the U antigen is present in 99.9% of the donors, if transfusion is anticipated, the Blood Bank needs to be notified immediately to order such rare units. It usually takes at least 24 hours to have U-negative units at UAB.  There are no other options for transfusion for this patient. "; 
    };
// 
// Warm autoantibody and single alloantibody
    if(document.antigenForm.warmAuto.checked && numberAntibodies==1)
    {
           document.antigenForm.textField.value = "";
           presurgery();
           document.antigenForm.textField.value += "This patient has a warm autoantibody and "+patientAntibodies[0]+". The latter is an alloantibody and units for transfusion must lack the "+ patientAntibodies[0]+" antigen.  The autoantibody is weak and probably not clinically significant.  However, it will react with all donor units. Thus, "+heOrShe(patientSexA)+" will receive units that are least incompatible with his plasma and he should be monitored for the small potential for hemolysis during and after the transfusion.  Considerable time is needed to crossmatch units for this patient."; 
    };
//    document.antigenForm.textField.value += Environment.NewLine;
//  Signature line
   document.antigenForm.textField.value += "\r\n"; 
   document.antigenForm.textField.value += "\r\n"; 
   document.antigenForm.textField.value+="Test interpretation and consult performed by:"+"\r\n";


   document.antigenForm.textField.value+="Note signed on "+ currMonth + "/" + currDate + "/" + currYear +" at " + currHour+":"+currMinute+" by .";

//   document.antigenForm.textField.value += conjoin(patientAntibodies);
//  document.antigenForm.textField.value+=currentlyPregnant
 //    document.antigenForm.textField.value += "test"+percentCompatible; 
//      document.antigenForm.textField.value += "test2";
//    var test = "document.antigenForm." + "compLua" + ".value";
//    document.antigenForm.textField.value += test; 
//    document.antigenForm.textField.value += document.antigenForm.compLua.value;
//    document.antigenForm.textField.value += percentCompatible;                  
 };

