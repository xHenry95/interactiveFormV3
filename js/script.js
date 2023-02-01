// Henry CS Tech Degree Project 3 - Interactive Form
// Going for exceeds expectations

// Add focus to first text field on load
const nameField = document.querySelector('input[type="text"]');
nameField.focus();

// Showing other job role text field 
function jobRoleOther() {
    const jobRoleSelect = document.getElementById('title');
    // changed display of otherJobInput to none on CSS line 525 to prevent box appearing briefly on load
    const otherJobInput = document.getElementById('other-job-role');

    jobRoleSelect.addEventListener('change', () => {
        if ( jobRoleSelect.value == 'other' ) {
            otherJobInput.style.display = 'inline-block';
        } else {
            otherJobInput.style.display = 'none';
        }
    })
}
jobRoleOther();

// T-Shirt info section, disable color selection until design has been selected, and display the correct colors for each design
function tshirtInfo() {
    const designSelect = document.getElementsByTagName('select')[2];
    const colorSelect = document.getElementsByTagName('select')[3];

    colorSelect.disabled = 'true';
    designSelect.addEventListener('change', () => {
        const designOptionsHrtJs = document.querySelectorAll('option[data-theme="heart js"]');
        const designOptionsJsPuns = document.querySelectorAll('option[data-theme="js puns"]');
        const colorSelectPrompt = document.querySelector('#color option');
        colorSelect.disabled = '';
        function loopThroughOptions(options, hiddenAttr) {
            for ( let i = 0; i < options.length; i++ ) {
                options[i].hidden = hiddenAttr;
            }
        }
        if ( designSelect.value == 'js puns' ) {
            colorSelectPrompt.selected = 'true';
            loopThroughOptions(designOptionsHrtJs, 'true');
            loopThroughOptions(designOptionsJsPuns, '');
        } else {
            colorSelectPrompt.selected = 'true';
            loopThroughOptions(designOptionsHrtJs, '');
            loopThroughOptions(designOptionsJsPuns, 'true');
        }
    })
}
tshirtInfo();

// Calculate total sum of the selected options in Register For Activities and update total value
function calcTotalActivities() {
    const activitiesFieldset = document.getElementById('activities');
    let runningTotal = 0;
    activitiesFieldset.addEventListener('change', (e) => {
        const totalCostPara = document.getElementById('activities-cost');
        const targetCost = parseInt(e.target.dataset.cost);

        const listOfSelections = document.querySelectorAll('#activities-box label');
        const targetSelectionDateTime = e.target.dataset.dayAndTime;

        if ( e.target.checked ) {
            // if target checked = true, add targetCost to sum 
            runningTotal += targetCost;

            // disable matching time events
            for ( let i = 0; i < listOfSelections.length; i++ ) {
                if ( targetSelectionDateTime === listOfSelections[i].children[0].dataset.dayAndTime &&
                     e.target.name !== listOfSelections[i].children[0].name ) {
                        listOfSelections[i].children[0].disabled = 'true';
                        listOfSelections[i].classList.add('disabled');
                }
            }
        } else {
            // else, remove targetCost from sum
            runningTotal -= targetCost;

            // enable matching time events
            for ( let i = 0; i < listOfSelections.length; i++ ) {
                if ( targetSelectionDateTime === listOfSelections[i].children[0].dataset.dayAndTime &&
                     e.target.name !== listOfSelections[i].children[0].name ) {
                        listOfSelections[i].children[0].disabled = '';
                        listOfSelections[i].classList.remove('disabled');
                }
            }
        }
        totalCostPara.textContent = `Total: $${runningTotal}`;
    })
}
calcTotalActivities();

// Payment methods options display 
function paymentMethods() {
    const paymentMethodSelect = document.getElementById('payment');
    const payPalBox = document.getElementById('paypal');
    const bitcoinBox = document.getElementById('bitcoin');
    function displayToNone(element) {
        element.style.display = 'none';
    }
    function displayToShow(element) {
        element.style.display = '';
    }

    paymentMethodSelect.children[1].selected = true; // setting payment selected to be Credit Card
    displayToNone(payPalBox);
    displayToNone(bitcoinBox);
    
    paymentMethodSelect.addEventListener('change', () => {
        const cardInfo = document.getElementById('credit-card');
        if ( paymentMethodSelect.children[1].selected !== true ) { // if Credit Card is NOT selected
            displayToNone(cardInfo);
            if ( paymentMethodSelect.children[2].selected === true ) { // if PayPal is selected
                displayToShow(payPalBox);
                displayToNone(bitcoinBox);
            } else { // otherwise, the only other selection can be Bitcoin
                displayToShow(bitcoinBox);
                displayToNone(payPalBox);
            }
        } else {
            cardInfo.style.display = '';
            displayToNone(payPalBox);
            displayToNone(bitcoinBox);
        }
    })
}
paymentMethods();

function toggleClassValid(element, addClass, removeClass) {
    element.classList.add(addClass);
    element.classList.remove(removeClass);
}
function regExTest( regEx, element, e ) {
    if ( !regEx.test(element.value) ) {
        toggleClassValid(element.parentNode, 'not-valid', 'valid');
        element.parentNode.lastElementChild.style.display = 'inline-block';
        e.preventDefault();
    } else {
        toggleClassValid(element.parentNode, 'valid', 'not-valid');
        element.parentNode.lastElementChild.style.display = 'none';
    }
}

const nameRegEx = /^[a-zA-Z ]{2,30}$/;
const emailRegEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
const ccNumRegEx = /(?:\d[ -]*?){13,16}/;
const zipRegEx = /\b\d{5}\b/;
const cvvRegEx = /\d\d\d/;

function submitListener() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
       
        // Check if name field
        const nameField = document.getElementById('name');
        regExTest(nameRegEx, nameField, e);

        // Check if valid email address
        const emailAddress = document.getElementById('email');
        regExTest(emailRegEx, emailAddress, e);

        // Check for selected activities
        const totalCostPara = document.getElementById('activities-cost');
        if ( totalCostPara.textContent === `Total: $0` ) {
            toggleClassValid(totalCostPara.parentNode, 'not-valid', 'valid');
            totalCostPara.parentNode.lastElementChild.style.display = 'inline-block';
            e.preventDefault();
        } else {
            toggleClassValid(totalCostPara.parentNode, 'valid', 'not-valid');
            totalCostPara.parentNode.lastElementChild.style.display = 'none';
        }

        // Check card information if selected
        const cardPayment = document.getElementById('payment').children[1];
        if ( cardPayment.selected === true ) {
            const ccNum = document.getElementById('cc-num');
            const zipCode = document.getElementById('zip');
            const cvvNum = document.getElementById('cvv'); 
            regExTest(ccNumRegEx, ccNum, e);
            regExTest(zipRegEx, zipCode, e);
            regExTest(cvvRegEx, cvvNum, e);
        }
    })
}
submitListener();

function activitiesFocus() {
    const activitiesCheckboxes = document.querySelectorAll('#activities-box label input[type="checkbox"]');
    activitiesCheckboxes.forEach( (checkbox) => {
        checkbox.addEventListener('focus', (e) => {
            e.target.parentElement.className = 'focus';
        })
    })
    activitiesCheckboxes.forEach( (checkbox) => {
        checkbox.addEventListener('blur', (e) => {
            e.target.parentElement.className = '';
        })
    })
}
activitiesFocus();

function realTimeValidator() {
    // Check if name field
    const nameField = document.getElementById('name');
    const nameHint = document.getElementById('name-hint');
    nameField.addEventListener('keyup', (e) => {
        regExTest(nameRegEx, nameField, e);
        if ( nameField.value !== '' ) {
            nameHint.textContent = 'Please enter a valid name';
        } else {
            nameHint.textContent = 'Name field cannot be blank';
        }
    })
    // Check if email field
    const emailField = document.getElementById('email');
    const emailHint = document.getElementById('email-hint');
    emailField.addEventListener('keyup', (e) => {
        regExTest(emailRegEx, emailField, e);
        if ( emailField.value !== '' ) {
            emailHint.textContent = 'Email address must be formatted correctly';
        } else {
            emailHint.textContent = 'Email address cannot be blank';
        }
    })
}
realTimeValidator();