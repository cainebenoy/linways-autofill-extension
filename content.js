window.addEventListener("message", (event) => {
  if (event.data.type === "AUTO_FILL_ALL") {
    autoFillAllTeachers(event.data.action);
  }
});

function fillForm(action) {
  const options = {
    excellent: 5,
    verygood: 4,
    good: 3
  };

  // Find all radio button groups
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const questionGroups = {};
  
  // Group radio buttons by their name attribute
  radioButtons.forEach((radio) => {
    const name = radio.name || radio.id;
    if (name) {
      if (!questionGroups[name]) {
        questionGroups[name] = [];
      }
      questionGroups[name].push(radio);
    }
  });

  // Fill each question group
  let filledCount = 0;
  Object.keys(questionGroups).forEach((groupName) => {
    const radios = questionGroups[groupName];
    
    // Determine which value to select
    let targetValue;
    if (action === "random") {
      targetValue = Math.random() > 0.5 ? 5 : 4;
    } else {
      targetValue = options[action];
    }
    
    // Find the radio button that matches the target value
    let clicked = false;
    radios.forEach((radio) => {
      if (clicked) return;
      
      const label = document.querySelector(`label[for="${radio.id}"]`) || radio.closest('label');
      const labelText = label ? label.textContent.trim() : '';
      
      // Improved matching - check for various patterns
      let isMatch = false;
      
      if (targetValue === 5) {
        isMatch = labelText.match(/^Excellent$/i) || 
                  labelText.match(/\bExcellent\b/i) ||
                  radio.value === '5' ||
                  radio.value === 'excellent' ||
                  radio.value === 'Excellent';
      } else if (targetValue === 4) {
        isMatch = labelText.match(/^Very\s*Good$/i) || 
                  labelText.match(/\bVery\s*Good\b/i) ||
                  radio.value === '4' ||
                  radio.value === 'verygood' ||
                  radio.value === 'Very Good';
      } else if (targetValue === 3) {
        isMatch = labelText.match(/^Good$/i) || 
                  labelText.match(/\bGood\b/i) && !labelText.match(/Very\s*Good/i) ||
                  radio.value === '3' ||
                  radio.value === 'good' ||
                  radio.value === 'Good';
      }
      
      if (isMatch) {
        // Try multiple methods to ensure the radio gets selected
        radio.click();
        
        if (!radio.checked && label) {
          label.click();
        }
        
        if (!radio.checked) {
          radio.checked = true;
          radio.dispatchEvent(new Event('change', { bubbles: true }));
          radio.dispatchEvent(new Event('click', { bubbles: true }));
          radio.dispatchEvent(new Event('input', { bubbles: true }));
        }
        
        if (radio.checked) {
          clicked = true;
          filledCount++;
        }
      }
    });
  });

  // No alert here; just return count
  return filledCount;
}

async function autoFillAllTeachers(action) {
  // Find all elements with 'Click to proceed' text
  let proceedElements = Array.from(document.querySelectorAll('*')).filter(el => {
    return el.textContent && el.textContent.trim().toLowerCase() === 'click to proceed';
  });

  // Filter out completed ones
  proceedElements = proceedElements.filter(el => {
    const parent = el.closest('div');
    const hasCompleted = parent && parent.textContent.includes('completed');
    return !hasCompleted;
  });

  if (proceedElements.length === 0) {
    alert('No pending teachers found!\n\nPlease make sure you are on the teacher list page.');
    return;
  }
  
  let totalTeachers = proceedElements.length;
  let processedCount = 0;

  for (let i = 0; i < totalTeachers; i++) {
    try {
      // Re-query elements each time as DOM changes
      let currentElements = Array.from(document.querySelectorAll('*')).filter(el => {
        return el.textContent && el.textContent.trim().toLowerCase() === 'click to proceed';
      });
      currentElements = currentElements.filter(el => {
        const parent = el.closest('div');
        const hasCompleted = parent && parent.textContent.includes('completed');
        return !hasCompleted;
      });

      if (currentElements.length === 0) {
        break;
      }

      const el = currentElements[0];

      // Step 1: Click "Click to proceed"
      el.click();
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Step 2: Click "Attend" button
      const attendButton = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent.trim() === 'Attend' || btn.textContent.includes('Attend')
      );

      if (attendButton) {
        attendButton.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Step 3: Fill the form
      const filled = fillForm(action);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 4: Click Finish button if present
      const finishButton = Array.from(document.querySelectorAll('button, a, input[type="button"], input[type="submit"]')).find(btn => {
        const txt = (btn.textContent || btn.value || '').trim().toLowerCase();
        return txt.includes('finish') || txt.includes('✓') || txt === 'finish';
      });
      if (finishButton) {
        finishButton.click();
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      // Step 5: Confirm with YES button
      const yesButton = Array.from(document.querySelectorAll('button, a, input[type="button"], input[type="submit"]')).find(btn => {
        const txt = (btn.textContent || btn.value || '').trim().toLowerCase();
        return txt === 'yes' || txt.includes('yes');
      });
      if (yesButton) {
        yesButton.click();
        await new Promise(resolve => setTimeout(resolve, 1800));
      }

      // Step 6: Go back to teacher list
      const backButton = Array.from(document.querySelectorAll('button, a')).find(btn => 
        btn.textContent.includes('Back') || btn.textContent.includes('BACK')
      );

      if (backButton) {
        backButton.click();
      } else {
        window.history.back();
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      processedCount++;

    } catch (error) {
      console.error('Error processing teacher:', error);
    }
  }

  alert(`✓ Automation completed!\n\nSuccessfully filled forms for ${processedCount} out of ${totalTeachers} teachers.`);
}
