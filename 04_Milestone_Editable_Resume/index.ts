// nav bar
function toggleMenu() {
    const navRight = document.querySelector('.nav-right') as HTMLElement;
    navRight.classList.toggle('active');
}

// Close the menu when any nav link is clicked
document.querySelectorAll('.nav-right li a').forEach(link => {
    link.addEventListener('click', () => {
        const navRight = document.querySelector('.nav-right') as HTMLElement;
        navRight.classList.remove('active');
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const navStartBtn = document.getElementById('navStartBtn') as HTMLButtonElement;
    const headerStartBtn = document.getElementById('headerStartBtn') as HTMLButtonElement;
    const templateStartBtn = document.getElementById('templateStartBtn') as HTMLButtonElement;

    const handleClick = () => {
        window.location.href = 'createResume/form.html';
     }

    navStartBtn.addEventListener("click", handleClick);
    headerStartBtn.addEventListener("click", handleClick);
});

// static interactive resume builder section:


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
