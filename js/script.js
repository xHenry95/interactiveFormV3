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
        if ( e.target.checked ) {
            // if target checked = true, add targetCost to sum 
            runningTotal += targetCost;
        } else {
            // else, remove targetCost from sum
            runningTotal -= targetCost;
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

function nameTest(e, name) {
    if ( !/^[a-zA-Z ]{2,30}$/.test(name) ) {
        alert('Please provide a valid name.');
        e.preventDefault();
    }
}
function emailTest(e, email) {
    if ( !/^[^@]+@[^@.]+\.[a-z]+$/i.test(email) ) {
        alert('Please provide a valid email address.');
        e.preventDefault();
    }
}
function ccNumTest(e, ccNum) {
    if ( !/(?:\d[ -]*?){13,16}/.test(ccNum) ) {
        alert('Please enter a valid card number.');
        e.preventDefault();
    }
}
function zipTest(e, zipCode) {
    if ( !/\b\d{5}\b/.test(zipCode) ) {
        alert('Please enter a valid zip code.');
        e.preventDefault();
    }
}
function cvvTest(e, cvvNum) {
    if ( !/\d\d\d/.test(cvvNum) ) {
        alert('Please enter a valid CVV.');
        e.preventDefault();
    }
}

function submitListener() {
    const submitBtn = document.querySelector('button[type="submit"]');
    submitBtn.addEventListener('click', (e) => {
       
        // Check if name field
        const nameFieldValue = document.getElementById('name').value;
        nameTest(e, nameFieldValue)

        // Check if valid email address
        const emailAddress = document.getElementById('email').value;
        emailTest(e, emailAddress)

        // // Check for selected activities
        const totalCostPara = document.getElementById('activities-cost');
        if ( totalCostPara.textContent === `Total: $0` ) {
            alert('Please register for at least one activity.');
            e.preventDefault();
        }

        // // Check card information if selected
        const cardPayment = document.getElementById('payment').children[1];
        if ( cardPayment.selected === true ) {
            const ccNum = document.getElementById('cc-num').value;
            const zipCode = document.getElementById('zip').value;
            const cvvNum = document.getElementById('cvv').value; 
            ccNumTest(e, ccNum);
            zipTest(e, zipCode);
            cvvTest(e, cvvNum);
        }

    })
}
submitListener();