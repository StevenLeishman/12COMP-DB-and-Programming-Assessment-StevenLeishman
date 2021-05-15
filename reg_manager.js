/**************************************************************/
// reg_manager.js
//
// Test registration page
// Written by Mr Bob 2020
// v01 Initial code
// v02 Include reg_getFormItemValue function in reg_manager.js 
// v04 Add conversion from string to number for numeric feilds
// v05 Cut down version

//Versions written by Steven leishman 2021
//V1 inital code from Mr Bob
//V2 Change object to suit my program and write details/stats to database
/**************************************************************/

/**************************************************************/
// reg_regDetailsEntered()
// Input event; called when user clicks submit button in reg form
// Write user's details to DB
// Input:   
// Return:
/**************************************************************/
function reg_regDetailsEntered() {
  console.log('reg_regDetailsEntered'); 
  
  // Save player's details from the form into your details and stats object
  
	//Data for userStats                                        
  userStats.gameName   			= reg_getFormItemValue("f_reg", 0);
	
	//Data for userDetails
  userDetails.phone       	= Number(reg_getFormItemValue("f_reg", 1));
	userDetails.gender       	= reg_getFormItemValue("f_reg", 2);
	userDetails.age     			= Number(reg_getFormItemValue("f_reg", 3));
	userDetails.houseNumber		= Number(reg_getFormItemValue("f_reg", 4));
	userDetails.city 					= reg_getFormItemValue("f_reg", 5);
	userDetails.suburb     		= reg_getFormItemValue("f_reg", 6);
	userDetails.streetName  	= reg_getFormItemValue("f_reg", 7);
	userDetails.postalCode  	= Number(reg_getFormItemValue("f_reg", 8));
	userDetails.bankAccount		= Number(reg_getFormItemValue("f_reg", 9)); 
    
  console.table(userDetails);
  // call your function to write to details record firebase 
	fb_writeRec(DETAILS,userDetails.uid,userDetails)
	
	// call your function to write to stats record firebase 
	fb_writeRec(STATS,userDetails.uid,userStats)

	//Call function to switch to home screen
	ui_switchScreens('s_regPg','s_homePg')
}

/**************************************************************/
// reg_getFormItemValue(_elementId, _item)
// Called by reg_regDetailsEntered
// Returns the value of the form's item
// Input:  element id & form item number
// Return: form item's value
/**************************************************************/
function reg_getFormItemValue(_elementId, _item) {
  console.log('reg_getFormItemValue: _elementId=' + _elementId +
  	  ',  _item= ' + _item);  
	return document.getElementById(_elementId).elements.item(_item).value;
}
/**************************************************************/
//    END OF PROG
/**************************************************************/