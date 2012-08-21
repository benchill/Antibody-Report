function processForm() {  
    var antibodies = ["D", "C", "E", "c", "e", "K", "Kpa", "Jsa", "k", "Kpb", "Jsb", "Fya", "Fyb", "Jka", "Jkb", "M", "N", "S", "s", "P", "Lea", "Leb", "Lua", "Lub"];
    var i, percentComp;
    percentComp = [];
    for(i = 0; i < antibodies.length; i += 1) {
        percentComp[i] = document.antigenForm['comp' + antibodies[i]].value;
    }
    //  var percentComp = [document.antigenForm.compD.value, document.antigenForm.compC.value, document.antigenForm.compE.value, document.antigenForm.compc.value, document.antigenForm.compe.value, document.antigenForm.compK.value, document.antigenForm.compKpa.value, document.antigenForm.compJsa.value, document.antigenForm.compk.value, document.antigenForm.compKpb.value, document.antigenForm.compJsb.value, document.antigenForm.compFya.value, document.antigenForm.compFyb.value, document.antigenForm.compJka.value, document.antigenForm.compJkb.value, document.antigenForm.compM.value, document.antigenForm.compN.value, document.antigenForm.compN.value, document.antigenForm.compS.value, document.antigenForm.comps.value, document.antigenForm.compP.value, document.antigenForm.compLea.value, document.antigenForm.compLeb.value, document.antigenForm.compLua.value, document.antigenForm.compLub.value];
    var tempMatrix= new Array();
    var patientAntibodies=new Array();
    var compUnitsA = new Array();
    var antigen = document.antigenForm.antigen;
    var patientSex=document.antigenForm.patientSex;
    var pregnant = document.antigenForm.pregnant;
    var compUnits = new Array();
    var percentCompatible = 1;
//    var i;
    var currentlyPregnant = false;
//    var comp = new Array();
    var patientSexA=0;
    var numberAntibodies;
    var n=0;
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
           patientAntibodies[n]=tempMatrix[i];
           compUnitsA[n] = percentComp[i];
            n=n+1;
        }
        numberAntibodies=n;
    };
    if(pregnant.checked)
    {
        currentlyPregnant = true;
    };
    if(patientAntibodies.length === 0) 
    {
        document.antigenForm.textField.value = "";
    };
    if(document.antigenForm.antTiter.checked && numberAntibodies===1)
    {
        document.antigenForm.textField.value = "";
         document.antigenForm.textField.value+="The patient has anti-"+patientAntibodies+" antibodies at a titer of " + document.antigenForm.titer.value +". ";
    }
    else if(patientAntibodies.length >= 1) 
    {
        document.antigenForm.textField.value = "The patient has anti-"+conjoin(patientAntibodies)+" alloantibodies. ";
    }
    
    if(numberAntibodies>1 && antigen[0].checked && document.antigenForm.RhImmuno.checked)
    {
          document.antigenForm.textField.value += "The anti-D alloantibody is likely due to Rh immunoglobulin administration during this pregnancy. "; 
    };
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

    if(patientSexA !=0 && numberAntibodies>=1) 
    {
        document.antigenForm.textField.value+="If transfusion is necessary, the patient will receive extended crossmatch compatible " + conjoinB(patientAntibodies)+ "-antigen negative units. ";
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
    for(i = 0; i < compUnitsA.length;i++ )
    {
        percentCompatible = percentCompatible * compUnitsA[i]/100;
    };
    percentCompatible = percentCompatible * 100;
    if(numberAntibodies>0 && percentCompatible>1) 
    {
        document.antigenForm.textField.value+="Approximately "+percentCompatible.toFixed(0)+"% of donor units are expected to be compatible. ";
    };
    if(numberAntibodies>0 && percentCompatible<1) 
    {
        document.antigenForm.textField.value+="Less than 1 percent of donor units are expected to be compatible; considerable time is needed to procure units for this patient. ";
    };

    if(numberAntibodies===1 && antigen[15].checked)
    {
           document.antigenForm.textField.value = "";
           document.antigenForm.textField.value = "This patient has anti-M. This antibody can be naturally occurring and does not react at body temperature; thus, it is not clinically significant.  If transfusion is necessary, she will receive appropriate pre-warm extended crossmatch compatible units. "; 
    };
    if(numberAntibodies===1 && antigen[0].checked && document.antigenForm.RhImmuno.checked)
    {
           document.antigenForm.textField.value = "";
           document.antigenForm.textField.value = "This patient has anti-D, likely due to Rh immunoglobulin administration during this pregnancy.  If transfusion is necessary, the Blood Bank will issue extended crossmatch compatible Rh negative units to prevent sensitization to the D antigen. "; 
    };
//    document.antigenForm.textField.value += Environment.NewLine;
   document.antigenForm.textField.value += "\r\n"; 
   document.antigenForm.textField.value += "\r\n"; 
   document.antigenForm.textField.value+="Consult performed by:"

//   document.antigenForm.textField.value += conjoin(patientAntibodies);
//  document.antigenForm.textField.value+=currentlyPregnant
 //    document.antigenForm.textField.value += "test"+percentCompatible; 
//      document.antigenForm.textField.value += "test2";
//    var test = "document.antigenForm." + "compLua" + ".value";
//    document.antigenForm.textField.value += test; 
//    document.antigenForm.textField.value += document.antigenForm.compLua.value;
//    document.antigenForm.textField.value += percentCompatible;                  
 };

