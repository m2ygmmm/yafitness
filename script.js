$(document).ready(function () {
    $('#questionnaireForm').hide();
    $('#spinnerDiv').hide();
    $('#alertBox').hide();
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
        const progress = ((index / totalQuestions) * 75).toFixed(0);

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

        if (!questionText) {
            $('#questionText').text('Great! Please complete the form below');
            $('#questionnaireForm').show();
            console.log("Answers so far:", answers);
            $('#questionnaireDiv').empty();
            updateProgressBar(Object.keys(questionnaire).length); 
            return;
        }

        const options = questionnaire[questionText];

        $('#questionText').text(questionText);
        $('#questionnaireDiv').empty();

        options.forEach(option => {
            buttonClass = answers[index] === option ? 'btn-outline-success' : 'btn-outline-light';
            $('#questionnaireDiv').append(`<button type="button" class="btn ${buttonClass} p-2 mx-2 shadow text-light" data-id="${option}">${option}</button>`);
        });

        if (index > 0) {
            $('#backButton').show();
        } else {
            $('#backButton').hide();
        }

        updateProgressBar(index);
    }

    $('#questionnaireDiv').on('click', 'button', function () {
        const selectedOption = $(this).data('id');
        answers[index] = selectedOption;
        index++;
        questionnaireLoop(index);
    });

    $('#backButton').on('click', function () {
        if (index > 0) {
            index--;
            questionnaireLoop(index);
            $('#questionnaireForm').hide();
        }
    });

    // Submit form and send data via AJAX
    $('#questionnaireForm').on('submit', function (e) {
        e.preventDefault();
    
        const journeyReason = $('#journeyReason').val();
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const phoneNumber = $('#phoneNumber').val();
        const email = $('#email').val();
        const instagramHandle = $('#instagramHandle').val();
    
        const formattedAnswers = answers
            .map((answer, index) => `Question ${index + 1}: ${answer} / `)
            .join("");
        const formattedAnswersList = `${formattedAnswers}`;
    
        const formData = {
            journeyReason: journeyReason,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            instagramHandle: instagramHandle,
            answers: formattedAnswersList // Use the formatted answers
        };
    
        $('#questionnaireForm').hide();
        $('#spinnerDiv').show();
        $('#progressBar')
            .css('width', `100%`)
            .text(`100%`);
        $('#progressBarDiv').show();
    
        emailjs.send("service_ldtgx25", "template_6v72o8e", formData)
            .then(function (response) {
                $('#alertBox')
                    .attr('class', 'alert alert-success p-2 mx-4')
                    .text('Thanks, One of our team members will be in touch with you shortly to assist you further.')
                    .show();
                setTimeout(() => {
                    location.reload();
                }, 5000);
                $('#spinnerDiv').hide();
            }, function (error) {
                $('#alertBox')
                    .attr('class', 'alert alert-danger p-2 mx-4')
                    .text('Error! Please try again')
                    .show();
                $('#spinnerDiv').hide();
            });
    });
    

    updateProgressBar(0);
    questionnaireLoop(index);
});
