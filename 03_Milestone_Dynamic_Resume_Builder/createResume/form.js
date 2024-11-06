"use strict";
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c, _d;
    const form = document.getElementById('resumeForm');
    const resumeSection = document.getElementById('resumeSection');
    (_a = document.getElementById('addEducationBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => addEducation());
    (_b = document.getElementById('addSkillBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => addSkill());
    (_c = document.getElementById('addExperienceBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => addExperience());
    (_d = document.getElementById('generateResumeBtn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        generateResume();
    });
    // Adding education details
    // Function to add new education fields
    function addEducation() {
        var _a;
        const educationContainer = document.getElementById('educationContainer');
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
        (_a = educationDiv.querySelector('.remove-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => educationDiv.remove());
    }
    // Function to add new skill fields
    function addSkill() {
        var _a;
        const skillsContainer = document.getElementById('skillsContainer');
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skills-entry';
        skillDiv.innerHTML = `
            <input type="text" name="skill" placeholder="Enter a skill" required>
            <button type="button" class="remove-btn">- Remove Skill</button>
        `;
        skillsContainer.appendChild(skillDiv);
        (_a = skillDiv.querySelector('.remove-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => skillDiv.remove());
    }
    // Function to add new experience fields
    function addExperience() {
        var _a;
        const experienceContainer = document.getElementById('experienceContainer');
        const experienceDiv = document.createElement('div');
        experienceDiv.className = 'experience-entry';
        experienceDiv.innerHTML = `
            <input type="text" name="experienceTitle" placeholder="Job Title" required><br />
            <input type="text" name="experienceLocation" placeholder="Location" required><br />
            <input type="text" name="experienceYear" placeholder="Duration" required><br />
            <textarea name="experienceDescription" placeholder="Experience Description" required></textarea><br />
            <button type="button" class="remove-btn">- Remove Experience</button><br>
        `;
        experienceContainer.appendChild(experienceDiv);
        (_a = experienceDiv.querySelector('.remove-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => experienceDiv.remove());
    }
    // Generate the resume
    function generateResume() {
        if (!form.checkValidity()) {
            alert("Please fill out all required fields.");
            return;
        }
        // Hide the form when resume is generated
        form.style.display = 'none';
        // show form data
        const formData = new FormData(form);
        const profilePictureFile = formData.get('profilePicture');
        const name = formData.get('name');
        const title = formData.get('title');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const profileDescription = formData.get('profileDescription');
        // show education data
        const educationDivs = document.querySelectorAll('#educationContainer > div');
        const education = Array.from(educationDivs).map(div => {
            const educationTitle = div.querySelector('input[name="educationTitle"]').value;
            const educationField = div.querySelector('input[name="educationField"]').value;
            const institution = div.querySelector('input[name="educationInstitution"]').value;
            const year = div.querySelector('input[name="educationYear"]').value;
            return `${educationTitle} in ${educationField}, ${institution} -- ${year}.`;
        });
        //  skills data
        const skillInputs = document.querySelectorAll('#skillsContainer input');
        const skills = Array.from(skillInputs).map(input => input.value);
        //  experience data
        const experienceDivs = document.querySelectorAll('#experienceContainer > div');
        const experiences = Array.from(experienceDivs).map(div => {
            const experienceTitle = div.querySelector('input[name="experienceTitle"]').value;
            const location = div.querySelector('input[name="experienceLocation"]').value;
            const year = div.querySelector('input[name="experienceYear"]').value;
            const description = div.querySelector('textarea[name="experienceDescription"]').value;
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
