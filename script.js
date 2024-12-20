$(document).ready(function () {
    $('#questionnaireForm').hide();
    const questionnaire = {
        "What is your primary fitness goal?": ["Weight loss", "Build muscle", "Healthy lifestyle"],
        "How old are you?": ["Under 18", "18-24", "25-30", "31+"],
        "What is your gender?": ["Male", "Female"],
        "Are you willing to invest financially into your health and wellness?": ["Yes", "No"],
    };

    let index = 0;
    const answers = [];

    function questionnaireLoop(index) {
        const keys = Object.keys(questionnaire);
        const questionText = keys[index];

        // Check if we have reached the end of the questionnaire
        if (!questionText) {
            $('#questionText').hide();
            $('#questionnaireForm').show();

            console.log("Answers so far:", answers);
            $('#questionnaireDiv').empty();
            $('#backButton').hide(); // Hide the back button at the end
            return;
        }

        const options = questionnaire[questionText];

        // Update the question text
        $('#questionText').text(questionText);

        // Clear previous options
        $('#questionnaireDiv').empty();

        // Add options as buttons
        options.forEach(option => {
            // Check if the option was already selected and add the class to mark it
            const buttonClass = answers[index] === option ? 'btn-primary' : 'btn-secondary';
            $('#questionnaireDiv').append(`<button type="button" class="btn ${buttonClass} p-2 mx-2" data-id="${option}">${option}</button>`);
        });

        // Show the back button only if the user is not on the first question
        if (index > 0) {
            $('#backButton').show();
        } else {
            $('#backButton').hide();
        }
    }

    // Handle button click using event delegation
    $('#questionnaireDiv').on('click', 'button', function () {
        const selectedOption = $(this).data('id');
        answers[index] = selectedOption; // Store the answer at the current index

        // Move to the next question
        index++;
        questionnaireLoop(index);
        
    });

    // Handle back button click
    $('#backButton').on('click', function () {
        if (index > 0) {
            index--; // Move to the previous question
            answers.pop(); // Remove the last selected answer
            questionnaireLoop(index);
        }
    });

    // Initialize with the first question
    questionnaireLoop(index);
});
