document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeSection = document.getElementById('resumeSection') as HTMLElement;

    document.getElementById('addEducationBtn')?.addEventListener('click', () => addEducation());
    document.getElementById('addSkillBtn')?.addEventListener('click', () => addSkill());
    document.getElementById('addExperienceBtn')?.addEventListener('click', () => addExperience());
    document.getElementById('generateResumeBtn')?.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        generateResume();
    });

    // Adding education details
     // Function to add new education fields
     function addEducation(): void {
        const educationContainer = document.getElementById('educationContainer') as HTMLElement;
        const educationDiv = document.createElement('div');
        educationDiv.className = 'education-entry';
        educationDiv.innerHTML = `
            <input type="text" name="educationTitle" placeholder="Education Title" required><br />
            <input type="text" name="educationField" placeholder="Education Field" required><br />
            <input type="text" name="educationInstitution" placeholder="Institution" required><br />
            <input type="text" name="educationYear" placeholder="Year" required><br />
            <button type="button" class="remove-btn">- Remove Education</button><br>
        `;
        educationContainer.appendChild(educationDiv);

        // Add event listener for the remove button
        educationDiv.querySelector('.remove-btn')?.addEventListener('click', () => educationDiv.remove());
    }

    // Function to add new skill fields
    function addSkill(): void {
        const skillsContainer = document.getElementById('skillsContainer') as HTMLElement;
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skills-entry'
        skillDiv.innerHTML = `
            <input type="text" name="skill" placeholder="Enter a skill" required>
            <button type="button" class="remove-btn">- Remove Skill</button>
        `;
        skillsContainer.appendChild(skillDiv);
        skillDiv.querySelector('.remove-btn')?.addEventListener('click', () => skillDiv.remove());
    }

    // Function to add new experience fields
    function addExperience(): void {
        const experienceContainer = document.getElementById('experienceContainer') as HTMLElement;
        const experienceDiv = document.createElement('div');
        experienceDiv.className = 'experience-entry'
        experienceDiv.innerHTML = `
            <input type="text" name="experienceTitle" placeholder="Job Title" required><br />
            <input type="text" name="experienceLocation" placeholder="Location" required><br />
            <input type="text" name="experienceYear" placeholder="Duration" required><br />
            <textarea name="experienceDescription" placeholder="Experience Description" required></textarea><br />
            <button type="button" class="remove-btn">- Remove Experience</button><br>
        `;
        experienceContainer.appendChild(experienceDiv);
        experienceDiv.querySelector('.remove-btn')?.addEventListener('click', () => experienceDiv.remove());
    }


    // Generate the resume
    function generateResume(): void {
        if (!form.checkValidity()) {
            alert("Please fill out all required fields.");
            return;
        }

        // Hide the form when resume is generated
        form.style.display = 'none';

        // show form data
        const formData = new FormData(form);
        const profilePictureFile = formData.get('profilePicture') as File;
        const name = formData.get('name') as string;
        const title = formData.get('title') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const profileDescription = formData.get('profileDescription') as string;

        // show education data
        const educationDivs = document.querySelectorAll('#educationContainer > div') as NodeListOf<HTMLDivElement>;
        const education = Array.from(educationDivs).map(div => {
            const educationTitle = (div.querySelector('input[name="educationTitle"]') as HTMLInputElement).value;
            const educationField = (div.querySelector('input[name="educationField"]') as HTMLInputElement).value;
            const institution = (div.querySelector('input[name="educationInstitution"]') as HTMLInputElement).value;
            const year = (div.querySelector('input[name="educationYear"]') as HTMLInputElement).value;
            return `${educationTitle} in ${educationField}, ${institution} -- ${year}.`;
        });

        //  skills data
        const skillInputs = document.querySelectorAll('#skillsContainer input') as NodeListOf<HTMLInputElement>;
        const skills = Array.from(skillInputs).map(input => input.value);

        //  experience data
        const experienceDivs = document.querySelectorAll('#experienceContainer > div') as NodeListOf<HTMLDivElement>;
        const experiences = Array.from(experienceDivs).map(div => {
            const experienceTitle = (div.querySelector('input[name="experienceTitle"]') as HTMLInputElement).value;
            const location = (div.querySelector('input[name="experienceLocation"]') as HTMLInputElement).value;
            const year = (div.querySelector('input[name="experienceYear"]') as HTMLInputElement).value;
            const description = (div.querySelector('textarea[name="experienceDescription"]') as HTMLInputElement).value;
            return `I worked as a ${experienceTitle} at ${location} during ${year}.\n${description}`;
        });

        // Create an image URL from the uploaded file (if uploaded)
        let profilePictureUrl = '';
        if (profilePictureFile) {
            profilePictureUrl = URL.createObjectURL(profilePictureFile);
        }

        // resume layout
        const resumeContent = `
        <div class="resume-box">
            <div class="left-section">
                ${profilePictureUrl ? `<img src="${profilePictureUrl}" alt="Profile Picture" class="profile-pic">` : ''}
                <div class="contact">
                    <h3>CONTACT DETAILS:</h3>
                    <p>Email: <a href="mailto:${email}">${email}</a></p>
                    <p>Phone: <a href="tel:${phone}">${phone}</a></p>
                </div>
                <div class="skills">
                    <h3>SKILLS:</h3>
                    <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
                </div>
            </div>
            <div class="right-section">
                <h1>${name.toUpperCase()}</h1>
                <p class="title">${title}</p>
                <div class="profile-description">
                    <h2>PROFILE:</h2>
                    <p>${profileDescription}</p>
                </div>
                <div class="education">
                    <h2>EDUCATION:</h2>
                     <ul>${education.map(edu => `  <li> ${edu}</li>`).join('\n')}</ul>
                </div>
                <div class="experience">
                    <h2>EXPERIENCE:</h2>
                    <ul> ${experiences.map(exp => ` <li>${exp}</li>`).join('\n')}</ul>
                </div>
            </div>
        </div>
    `;
    
        // show the generated resume in styled container.... with css 
        resumeSection.innerHTML = resumeContent;
        resumeSection.style.display = 'block';
    }
});
