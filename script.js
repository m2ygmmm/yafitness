$(document).ready(function () {
    $('#questionnaireForm').hide();
    const questionnaire = {
        "What is your primary fitness goal?": ["Weight loss", "Build muscle", "Healthy lifestyle"],
        "How old are you?": ["Under 18", "18-24", "25-30", "31+"],
        "What is your gender?": ["Male", "Female"],
    };

    let index = 0;
    const answers = [];
    let buttonClass = "";

    function updateProgressBar(index) {
        const totalQuestions = Object.keys(questionnaire).length;
        const progress = ((index / totalQuestions) * 75).toFixed(0); // Adjust max percentage to 75%

        // Only show the progress bar if there is at least one answer
        if (answers.length > 0) {
            $('#progressBar')
                .css('width', `${progress}%`)
                .attr('aria-valuenow', progress)
                .text(`${progress}%`)
                .show(); // Show the progress bar
                $('#progressBarDiv').show();
        } else {
            $('#progressBarDiv').hide(); // Hide the progress bar if no answers
        }
    }

    function questionnaireLoop(index) {
        const keys = Object.keys(questionnaire);
        const questionText = keys[index];

        // Check if we have reached the end of the questionnaire
        if (!questionText) {
            $('#questionText').text('Great! Please complete the form below');
            $('#questionnaireForm').show();
            console.log("Answers so far:", answers);
            $('#questionnaireDiv').empty();
            updateProgressBar(Object.keys(questionnaire).length); // Set progress to 100% at the end
            return;
        }

        const options = questionnaire[questionText];

        // Update the question text
        $('#questionText').text(questionText);

        // Clear previous options
        $('#questionnaireDiv').empty();

        // Add options as buttons
        options.forEach(option => {
            // Check if the option matches the current answer at this index and set button color accordingly
            buttonClass = answers[index] === option ? 'btn-outline-success' : 'btn-outline-light';
            $('#questionnaireDiv').append(`<button type="button" class="btn ${buttonClass} p-2 mx-2 shadow text-light" data-id="${option}">${option}</button>`);
        });

        // Show the back button only if the user is not on the first question
        if (index > 0) {
            $('#backButton').show();
        } else {
            $('#backButton').hide();
        }

        // Update progress bar
        updateProgressBar(index);
    }

    // Handle button click using event delegation
    $('#questionnaireDiv').on('click', 'button', function () {
        const selectedOption = $(this).data('id');
        answers[index] = selectedOption; // Store the answer at the current index
        console.log('Updated answers:', answers); // Log after update

        // Move to the next question
        index++;
        questionnaireLoop(index);
    });

    // Handle back button click
    $('#backButton').on('click', function () {
        if (index > 0) {
            index--; // Move to the previous question
            // No need to pop from answers, as the array already holds the answers for previous questions
            questionnaireLoop(index);
            $('#questionnaireForm').hide();
        }
    });

    // Initialize the progress bar and questionnaire
    updateProgressBar(0); // Ensure progress bar starts at 0%
    questionnaireLoop(index);
});
