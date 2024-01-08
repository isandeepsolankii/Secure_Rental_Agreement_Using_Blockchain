// Import Web3 JS library
const Web3 = require('web3');

// Import the ABI definition of the DemoContract
const artifact = require('../../build/contracts/RentalAgreement.json');

const deployedContract = artifact.networks[5777];
const contractAddress = deployedContract.address;

const MIN_GAS = 1000000;

const App = {
    web3: null,
    contractInstance: null,
    accounts: null,

    start: async function() {
        const { web3 } = this;
        // Get the accounts
        this.accounts = await web3.eth.getAccounts();

        console.log(this.accounts);

        this.contractInstance = new web3.eth.Contract(
            artifact.abi,
            contractAddress
        );
    },

    //get Lanldord

    getLandlord: async function(){
        
        const Property_Id = document.getElementById('inputlandlordpropertyID').value;
        
         if (Property_Id.length == 0){
            document.getElementById("landlordFullName").innerHTML =  null;
            document.getElementById("landlordAdhaarCard").innerHTML = null;
            document.getElementById("landlordPhoneNumber").innerHTML =  null;
            document.getElementById("landlordPropertyCity").innerHTML =  null;
            document.getElementById("landlordMainBalance").innerHTML =  null;

        } 
            await this.contractInstance.methods.getLandlord(Property_Id).call().then(function(result){
                console.log(result)
                document.getElementById("landlordFullName").innerHTML = "Full Name: " + result[0];
                document.getElementById("landlordAdhaarCard").innerHTML = "Aadhar Number: " + result[1];
                document.getElementById("landlordPhoneNumber").innerHTML =  "Phone Number: " + result[2];
                document.getElementById("landlordPropertyCity").innerHTML =  "Property Address: " + result[3]; 
                document.getElementById("landlordMainBalance").innerHTML =  "Landlord Main Balance: " + result[4];
                
            });

        },

              
        
    


    //Get Property

    getproperty: async function(){
        const Property_Id = document.getElementById('inputPropertyID').value;
        console.log("propertyId: ",  Property_Id) ;
        if (Property_Id.length==0) {
            document.getElementById("exist").innerHTML = "Enter Property ID!";
            document.getElementById("_landlordFullName").innerHTML =  null;
            document.getElementById("_landlordPhoneNumber").innerHTML = null;
            document.getElementById("_landlordPropertyId").innerHTML =  null;
            document.getElementById("_landlordTypeofProperty").innerHTML = null;
            document.getElementById("_landlordPropertyArea").innerHTML =  null; 
            document.getElementById("_landlordPropertyRentAmount").innerHTML =  null; 
            document.getElementById("_landlordPropertyDepositeAmount").innerHTML =  null; 
        }
        else {
            const validate = await this.contractInstance.methods.validateProperty(Property_Id).call();
            
            if (validate){
                await this.contractInstance.methods.getproperty(Property_Id).call().then(function(result){
                    console.log(result)
                    document.getElementById("_landlordFullName").innerHTML = "Full Name: " + result[0];
                    document.getElementById("_landlordPhoneNumber").innerHTML =  "Phone Number: " + result[1];
                    document.getElementById("_landlordPropertyId").innerHTML = "Property Id: " + result[2];
                    document.getElementById("_landlordTypeofProperty").innerHTML =  "Property Type: " + result[3];
                    document.getElementById("_landlordPropertyArea").innerHTML = "Property Area: " + result[4];
                    document.getElementById("_landlordPropertyRentAmount").innerHTML =  "Rent Amount: " + result[5];
                    document.getElementById("_landlordPropertyDepositeAmount").innerHTML =  "Deposite Amount: " + result[6];
                });  
            }
            else{
                document.getElementById("_landlordFullName").innerHTML =  null;
                document.getElementById("_landlordPhoneNumber").innerHTML =  null;
                document.getElementById("_landlordPropertyId").innerHTML = null;
                document.getElementById("_landlordTypeofProperty").innerHTML =  null;
                document.getElementById("_landlordPropertyArea").innerHTML = null;
                document.getElementById("_landlordPropertyRentAmount").innerHTML =  null;
                document.getElementById("_landlordPropertyDepositeAmount").innerHTML =  null;
            }   
        }
    },

    //Get Tenant

    getTenant: async function(){
        const Tenant_Aadhar_Id = document.getElementById('inputAdhaarId').value;
        if (Tenant_Aadhar_Id.length==0) {
            document.getElementById("tenantFullname").innerHTML =  null;
            document.getElementById("tenantPhoneNumber").innerHTML =  null;
            document.getElementById("tenantAdhaarCard").innerHTML = null;
            document.getElementById("tenantMainBalance").innerHTML =  null;
            document.getElementById("tenantHouseCity").innerHTML = null;
            
        }
        else {
            const validate = await this.contractInstance.methods.validateTenant(Tenant_Aadhar_Id).call();
            
            if (validate){
                await this.contractInstance.methods.getTenant(Tenant_Aadhar_Id).call().then(function(result){
                    console.log(result)
                    document.getElementById("tenantFullname").innerHTML = "Full Name: " + result[0];
                    document.getElementById("tenantPhoneNumber").innerHTML =  "Phone Number: " + result[1];
                    document.getElementById("tenantAdhaarCard").innerHTML = "Aadhar Number: " + result[2];
                    document.getElementById("tenantMainBalance").innerHTML =  "Tenant Main Balance: " + result[3];
                    document.getElementById("tenantHouseCity").innerHTML = "Tenant City: " + result[4];
                });  
            }
            else{
                document.getElementById("tenantFullname").innerHTML =  null;
                document.getElementById("tenantPhoneNumber").innerHTML =  null;
                document.getElementById("tenantAdhaarCard").innerHTML = null;
                document.getElementById("tenantMainBalance").innerHTML =  null;
                document.getElementById("tenantHouseCity").innerHTML = null;
            }  
        }
    },

    
    // Set Landlord Registration Form

    addLandlord: async function() {
        const Landlord_FullName = document.getElementById('landlord-FullName').value;
        const Lanlord_Phone_Number = document.getElementById('landlord-PhoneNumber').value;
        const Landlord_Aadhar_Id = document.getElementById('landlord-AdhaarCard').value;
        const Landlord_Balance= document.getElementById('landlord-MainBalance').value;
        const Property_Type= document.getElementById('landlord-TypeofProperty').value;
        const Property_Id = document.getElementById('landlord-PropertyId').value;
        const Property_Area = document.getElementById('landlord-PropertyArea').value;
        const Landlord_Address = document.getElementById('landlord-PropertyCity').value;
        const Availability = document.getElementById('landlord-PropertyAvailibility').value;
        const Rent_Amount= document.getElementById('landlord-PropertyRentAmount').value;
        const Deposite_Amount = document.getElementById('landlord-PropertyDepositeAmount').value;
        
        
        let valuesCheck = false;
            if (Landlord_FullName == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Full Name";
            else if (Lanlord_Phone_Number.length == 0)
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Phone Number";
            else if (Lanlord_Phone_Number.length != 10)
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Phone Number";
            else if (Landlord_Aadhar_Id == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Aadhar Number";
            else if (Landlord_Balance.length == 0)
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Main Balance";
            else if (Property_Type == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter Property Type";
            else if (Property_Id == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter Property Id";
            else if (Property_Area == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter Property Area";
            else if (Landlord_Address == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter Your Address";
                else if (Availability == "")
                document.getElementById("inputValuesCheck").innerHTML = "Type yes or No for  Avalibility Status";
                else if (Rent_Amount.length == 0)
                document.getElementById("inputValuesCheck").innerHTML = "Enter Monthly Rent Amount";
                else if (Deposite_Amount.length == 0)
                document.getElementById("inputValuesCheck").innerHTML = "Enter Deposite Amount";
            else
                valuesCheck = true;
        
        if (valuesCheck){
            const validate = await this.contractInstance.methods.validateLandlord(Landlord_Aadhar_Id,Property_Id).call();

            if (!validate){
                console.log(Landlord_FullName, Lanlord_Phone_Number, Landlord_Aadhar_Id, Landlord_Balance,Property_Type,Property_Id,Property_Area , Landlord_Address, Availability, Rent_Amount, Deposite_Amount);

        const gas = await this.contractInstance.methods.addLandlord(Landlord_FullName, Lanlord_Phone_Number, Landlord_Aadhar_Id, Landlord_Balance,Property_Type,Property_Id,Property_Area , Landlord_Address, Availability, Rent_Amount, Deposite_Amount).estimateGas({
            from: this.accounts[0],
        });
            await this.contractInstance.methods.addLandlord(Landlord_FullName, Lanlord_Phone_Number, Landlord_Aadhar_Id, Landlord_Balance,Property_Type,Property_Id,Property_Area , Landlord_Address, Availability, Rent_Amount, Deposite_Amount).send ({
            from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
                });


                document.getElementById("userConfirmationCheck").innerHTML = "Success! ✔️";
                document.getElementById("userValidateCheck").innerHTML = null;
                document.getElementById("inputValuesCheck").innerHTML = null;
            }
            else{
                document.getElementById("userConfirmationCheck").innerHTML = null;
                document.getElementById("userValidateCheck").innerHTML = "Property Id already exists! ⚠️";
                document.getElementById("inputValuesCheck").innerHTML = null;
            }
        }
        else {
            document.getElementById("userConfirmationCheck").innerHTML = null;
            document.getElementById("userValidateCheck").innerHTML = null;
        }
    },


// Set Tenant Registration form

addTenant: async function() {
    const Tenant_FullName = document.getElementById('tenant-Fullname').value;
    const Tenant_Phone_Number = document.getElementById('tenant-PhoneNumber').value;
    const Tenant_Aadhar_Id = document.getElementById('tenant-AdhaarCard').value;
    const Tenant_Balance= document.getElementById('tenant-MainBalance').value;
    const Tenant_City = document.getElementById('tenant-HouseCity').value;
    

    let valuesCheck = false;
            if (Tenant_FullName == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Full Name ⚠️";
            else if (Tenant_Phone_Number.length == 0)
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Phone Number ⚠️";
            else if (Tenant_Phone_Number.length != 10)
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Phone Number ⚠️";
            else if (Tenant_Aadhar_Id == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Aadhar Number ⚠️";
            else if (Tenant_Balance.length == 0)
                document.getElementById("inputValuesCheck").innerHTML = "Enter your Main Balance ⚠️";
            else if (Tenant_City == "")
                document.getElementById("inputValuesCheck").innerHTML = "Enter Your Address ⚠️";
                
            else
                valuesCheck = true;
        
        if (valuesCheck){
            const validate = await this.contractInstance.methods.validateTenant(Tenant_Aadhar_Id).call();

            if (!validate){
                console.log(Tenant_FullName , Tenant_Phone_Number, Tenant_Aadhar_Id , Tenant_Balance,Tenant_City);

const gas = await this.contractInstance.methods.addTenant(Tenant_FullName , Tenant_Phone_Number, Tenant_Aadhar_Id , Tenant_Balance,Tenant_City).estimateGas({
    from: this.accounts[0],
});
    await this.contractInstance.methods.addTenant(Tenant_FullName , Tenant_Phone_Number, Tenant_Aadhar_Id , Tenant_Balance,Tenant_City).send ({
    from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
    });

                document.getElementById("userConfirmationCheck").innerHTML = "Success! ✔️";
                document.getElementById("userValidateCheck").innerHTML = null;
                document.getElementById("inputValuesCheck").innerHTML = null;
            }
            else{
                document.getElementById("userConfirmationCheck").innerHTML = null;
                document.getElementById("userValidateCheck").innerHTML = "Aadhar ID already exists! ⚠️";
                document.getElementById("inputValuesCheck").innerHTML = null;
            }
        }
        else {
            document.getElementById("userConfirmationCheck").innerHTML = null;
            document.getElementById("userValidateCheck").innerHTML = null;
        }
    },

    

//validating Property
validateProperty: async function() {
    var Property_Id = document.getElementById('validityproperty').value;
    if (Property_Id.length==0) {
        document.getElementById("verifiedpropertyId").innerHTML = "Enter Property ID! ⚠️";
    }
    else {
        let result = await this.contractInstance.methods.validateProperty(Property_Id).call();
        console.log(result);
        
            if(result) {
                document.getElementById("verifiedpropertyId").innerHTML = "Verified ✔️";
            }
            else {
                document.getElementById("verifiedpropertyId").innerHTML = "Unverified  ";
            }
    }
},

//validating landlord
validateLandlord: async function() {
    var Landlord_Aadhar_Id = document.getElementById('validateLandlordAdhaarId').value;
    var Property_Id = document.getElementById('validatePropertyID').value;
    if (Landlord_Aadhar_Id.length==0) {
        document.getElementById("verifiedlandlordId").innerHTML = "Enter Landlord Adhaar ID! ⚠️";
    }
    else if (Property_Id.length == 0){
        document.getElementById("verifiedlandlordId").innerHTML = "Enter Property ID! ⚠️";
    }
    else {
        let result = await this.contractInstance.methods.validateLandlord(Landlord_Aadhar_Id, Property_Id).call();
        console.log(result);
        
            if(result) {
                document.getElementById("verifiedlandlordId").innerHTML = "Verified ✔️";
            }
            else {
                document.getElementById("verifiedlandlordId").innerHTML = "Unverified ❌";
            }
    }

},

//validating Tenant
validateTenant: async function() {
    var Tenant_Aadhar_Id = document.getElementById('validitytenant').value;
    if (Tenant_Aadhar_Id.length==0) {
        document.getElementById("verifiedtenantId").innerHTML = "Enter Aadhar ID! ⚠️";
    }
    else {
        
        let result = await this.contractInstance.methods.validateTenant(Tenant_Aadhar_Id).call();
        console.log(result);
        
            if(result) {
                document.getElementById("verifiedtenantId").innerHTML = "Verified ✔️";
            }
            else {
                document.getElementById("verifiedtenantId").innerHTML = "Unverified ❌";
            }
    }
},

//Rent a Property
rentproperty: async function()
    {
        const Property_Id = document.getElementById('rentapropertyID').value;
        const Tenant_Aadhar_Id = document.getElementById('rentaadhaarID').value;

        if (Property_Id.length==0) {
            document.getElementById("verifiedarentaproperty").innerHTML = "Enter Property ID! ⚠️";
        }

         else if (Tenant_Aadhar_Id.length==0) {
            document.getElementById("verifiedarentaproperty").innerHTML = "Enter Aadhar ID! ⚠️";
        }

else {
    console.log(Property_Id, Tenant_Aadhar_Id);
        
    const gas = await this.contractInstance.methods.rentproperty(Property_Id, Tenant_Aadhar_Id).estimateGas
    ({
        from: this.accounts[0]
    });
    
    await this.contractInstance.methods.rentproperty(Property_Id, Tenant_Aadhar_Id).send
    ({
        from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
    });
}


        if(Property_Id, Tenant_Aadhar_Id) {
            document.getElementById("verifiedarentaproperty").innerHTML = "Property Rented Seccessfully ✔️";
        }
        else {
            document.getElementById("verifiedarentaproperty").innerHTML = "Enter Correct Details and Try again ❌";
        }

},
 

//Pay rent
payRent: async function()
    {
        const Property_Id = document.getElementById('PaypropertyID').value;
        const Tenant_Aadhar_Id = document.getElementById('PayAdhaarId').value;
        
        if (Property_Id.length==0) {
            document.getElementById("verifiedpayingrent").innerHTML = "Enter Property ID! ⚠️";
        }

         else if (Tenant_Aadhar_Id.length==0) {
            document.getElementById("verifiedpayingrent").innerHTML = "Enter Aadhar ID! ⚠️";
        }

        else {
            console.log(Property_Id, Tenant_Aadhar_Id);
        
        const gas = await this.contractInstance.methods.payRent(Property_Id, Tenant_Aadhar_Id).estimateGas
        ({
            from: this.accounts[0]
        });
        
        await this.contractInstance.methods.payRent(Property_Id, Tenant_Aadhar_Id).send
        ({
            from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
        });
        }

        if(Property_Id, Tenant_Aadhar_Id) {
            document.getElementById("verifiedpayingrent").innerHTML = "Rent Paid Successfully ✔️";
        }
        else {
            document.getElementById("verifiedpayingrent").innerHTML = "Enter Correct Details and Try again ❌";
        }
        
    },

    //Vacant a Property
    vacantProperty: async function()
{
    const Property_Id = document.getElementById('vacantpropertyID').value;
    const Tenant_Aadhar_Id = document.getElementById('vacantAdhaarID').value;
    
    if (Property_Id.length==0) {
        document.getElementById("verifiedvacantproperty").innerHTML = "Enter Property ID! ⚠️";
    }

     else if (Tenant_Aadhar_Id.length==0) {
        document.getElementById("verifiedvacantproperty").innerHTML = "Enter Aadhar ID! ⚠️";
    }

    else {
        console.log(Property_Id, Tenant_Aadhar_Id);
    
    const gas = await this.contractInstance.methods.vacantProperty(Property_Id, Tenant_Aadhar_Id).estimateGas
    ({
        from: this.accounts[0]
    });
    
    await this.contractInstance.methods.vacantProperty(Property_Id, Tenant_Aadhar_Id).send
    ({
        from: this.accounts[0], gas: Math.max(gas, MIN_GAS)
    });
}
    
    if(Property_Id, Tenant_Aadhar_Id) 
        {
        document.getElementById("verifiedvacantproperty").innerHTML = "Vacanting  Successfully Done. ✔️";
        }
    else 
        {
        document.getElementById("verifiedvacantproperty").innerHTML = "Enter Correct Details and Try again. ❌";
        }
}
}


window.App = App;

window.addEventListener("load", function() {
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );
    App.start();
});









