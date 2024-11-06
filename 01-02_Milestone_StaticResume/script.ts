const toggleButton = document.getElementById('toggleButton') as HTMLButtonElement;
const skillsSection = document.getElementById('skills-section') as HTMLDivElement;
const educationSection = document.getElementById('education-section') as HTMLDivElement;
const experienceSection = document.getElementById('experience-section') as HTMLDivElement;

let isExpanded = false;  // State to track if sections are visible or not

// Initially both sections are hidden
skillsSection.classList.add('hidden');
educationSection.classList.add('hidden');
experienceSection.classList.add('hidden');

toggleButton.addEventListener('click', () => {
    isExpanded = !isExpanded;  // Toggle the state

    if (isExpanded) {
        // Show sections
        skillsSection.classList.remove('hidden');
        educationSection.classList.remove('hidden')
        experienceSection.classList.remove('hidden');
        toggleButton.textContent = "Hide More";  // Update button text
    } else {
        // Hide sections
        skillsSection.classList.add('hidden');
        educationSection.classList.add('hidden');
        experienceSection.classList.add('hidden');
        toggleButton.textContent = "Show More";  // Update button text
    }
});
