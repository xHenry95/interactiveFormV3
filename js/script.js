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