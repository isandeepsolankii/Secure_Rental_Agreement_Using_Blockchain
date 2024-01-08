pragma solidity ^0.8.10;
// SPDX-License-Identifier: MIT

contract RentalAgreement {

    struct landlord
//structures

    {
        string  landlordName;
        string landlordAdhaarId;
        uint landlordNumber;
        string  landlordAddress;
        string propertyId;
        uint landlordBalance;
    }


    struct property
    {
        string landlordName;
        uint landlordNumber;
        string landlordAdhaarId;
        string propertyType;
        string propertyAddress;
        string propertyId;
        string propertyArea;
        uint rentAmount;
        uint depositeAmount;
        bool availableforRent;
        bool isRented ;
    }

    struct tenant 
    {
        string tenantName;
        uint tenantNumber;
        string tenantAdhaarId;
        uint tenantBalance;
        string tenantCity;
    
    }   

//Mapping

     mapping (string => landlord) landlordMap;

     mapping (string => property) propertyMap;

	 mapping(string => tenant) tenantMap;

//Initializing array

    string[] propertyArray;
    string[] landlordArray;
	string[] tenantArray;

//Set Functions for landlord and his Property

    function addLandlord(string memory _landlordName,uint _landlordNumber,string memory _landlordAdhaarId
    ,uint _landlordBalance,string memory _propertyType, string memory _propertyId, string memory _propertyArea, string memory _landlordAddress,bool _availableforRent, uint _rentAmount, uint _depositeAmount) public 
    {

        require(bytes(_landlordName).length > 0, "No data found. Enter your Name.");
        require(bytes(_landlordAdhaarId).length > 0, "No data found. Enter your Adhaar Number.");
        require(bytes(_landlordAddress).length > 0, "No data found, Enter Address.");
        require(bytes(_propertyId).length > 0, "No data found, Enter the property Id.");
        require(uint(_rentAmount) > 0, "No data found. Enter Rent Amount.");
        require(uint(_depositeAmount) > 0, "No data found. Enter Deposite Amount");
        require(uint(_landlordBalance)>0,"No data found. Enter Balance Amount");

    

        require(
            keccak256(abi.encodePacked((propertyMap[_propertyId].propertyId)))
            !=
            keccak256(abi.encodePacked(_propertyId))
        );

        landlordMap[_propertyId].landlordName = _landlordName;
        landlordMap[_propertyId].landlordNumber = _landlordNumber;
        landlordMap[_propertyId].landlordAdhaarId =_landlordAdhaarId;
        landlordMap[_propertyId].landlordBalance = _landlordBalance;
        propertyMap[_propertyId].propertyType = _propertyType;
        propertyMap[_propertyId].propertyId = _propertyId;
        propertyMap[_propertyId].propertyArea = _propertyArea;
        landlordMap[_propertyId].landlordAddress = _landlordAddress;
        propertyMap[_propertyId].availableforRent = _availableforRent;
        propertyMap[_propertyId].rentAmount = _rentAmount;
        propertyMap[_propertyId].depositeAmount = _depositeAmount;
        
        

            

        propertyArray.push(_propertyId);
        landlordArray.push(_landlordAdhaarId);
        
    }

    //Set Function for tenant
	 function addTenant(string memory _tenantName, uint _tenantNumber , string memory _tenantAdhaarId, uint _tenantBalance, string memory _tenantCity) public
    {
        

    require(
            keccak256(abi.encodePacked((tenantMap[_tenantAdhaarId].tenantAdhaarId)))
            !=
            keccak256(abi.encodePacked(_tenantAdhaarId))
        );

        tenantMap[_tenantAdhaarId].tenantName = _tenantName;
        tenantMap[_tenantAdhaarId].tenantNumber=_tenantNumber;
        tenantMap[_tenantAdhaarId].tenantAdhaarId = _tenantAdhaarId;
        tenantMap[_tenantAdhaarId].tenantBalance = _tenantBalance;
        tenantMap[_tenantAdhaarId].tenantCity = _tenantCity;
        tenantArray.push(_tenantAdhaarId);
    }


//Get Function for Landlord



    function getLandlord(string memory _propertyId) view public returns (string memory, string memory,uint, string memory,uint) 
    {
        return (
           landlordMap[_propertyId].landlordName,
           landlordMap[_propertyId].landlordAdhaarId,
           landlordMap[_propertyId].landlordNumber,
           landlordMap[_propertyId].landlordAddress,
           landlordMap[_propertyId].landlordBalance
           

        );
    }

    
//get function for Property
     function getproperty(string memory _propertyId) view public returns (string memory ,uint ,string memory,string memory, string memory, uint, uint)
    {
        return (
            landlordMap[_propertyId].landlordName,
            landlordMap[_propertyId].landlordNumber ,
            propertyMap[_propertyId].propertyId,
            propertyMap[_propertyId].propertyType,
           propertyMap[_propertyId].propertyArea,
           propertyMap[_propertyId].rentAmount,
           propertyMap[_propertyId].depositeAmount
           
        );
    }
//Get function for Tenant
	 function getTenant(string memory _tenantAdhaarId) view public returns (string memory, uint ,string memory, uint, string memory)
    {
        return
        (
            tenantMap[_tenantAdhaarId].tenantName,
            tenantMap[_tenantAdhaarId].tenantNumber,
            tenantMap[_tenantAdhaarId].tenantAdhaarId,
            tenantMap[_tenantAdhaarId].tenantBalance,
            tenantMap[_tenantAdhaarId].tenantCity

        );
}


//validate function for Landlord

function validateLandlord (string memory _landlordAdhaarId , string memory _propertyId) view public returns(bool)
   {
     if (keccak256(abi.encodePacked((landlordMap[_propertyId].landlordAdhaarId))) 
                ==
      keccak256(abi.encodePacked(_landlordAdhaarId)))
     return true;
     else return false;

    }

//validate function for Property
function validateProperty(string memory _propertyId) view public returns(bool)
    {

     if (keccak256(abi.encodePacked((propertyMap[_propertyId].propertyId))) == 
     keccak256(abi.encodePacked(_propertyId)))
     return true;
     else return false;

    }

//validate function for Tenant
function validateTenant(string memory _tenantAdhaarId) view public returns(bool)
    {

     if (keccak256(abi.encodePacked((tenantMap[_tenantAdhaarId].tenantAdhaarId))) == keccak256(abi.encodePacked(_tenantAdhaarId)))
     return true;
     else return false;

    }

 function getPropertyId() view public returns(string[] memory)
    {
            return propertyArray;
    }

    function getLandlordId() view public returns (string[] memory)
    {
        return landlordArray;
    }

    function gettenantId() view public returns (string[] memory) 
    {
        return tenantArray;
    }
    function rentproperty(string memory _propertyId , string memory _tenantAdhaarId)  public
    {
        require( propertyMap[_propertyId].availableforRent == true) ;//availiablefor sell or not
        
        landlordMap[_propertyId].landlordBalance +=   propertyMap[_propertyId].depositeAmount ;
        tenantMap[_tenantAdhaarId].tenantBalance -=  propertyMap[_propertyId].depositeAmount ;
        propertyMap[_propertyId].isRented = true;

        
    }
    function payRent(string memory _propertyId , string memory _tenantAdhaarId)  public
    {
        require( propertyMap[_propertyId].isRented == true) ;//availiablefor sell or not
        landlordMap[_propertyId].landlordBalance +=   propertyMap[_propertyId].rentAmount;
        tenantMap[_tenantAdhaarId].tenantBalance -=  propertyMap[_propertyId].rentAmount;
        
    }
     function vacantProperty(string memory _propertyId , string memory _tenantAdhaarId)  public
    {
        require( propertyMap[_propertyId].availableforRent == true) ;//availiablefor sell or not
        
        landlordMap[_propertyId].landlordBalance -=   propertyMap[_propertyId].depositeAmount;
        tenantMap[_tenantAdhaarId].tenantBalance +=  propertyMap[_propertyId].depositeAmount;
        
    }

}
