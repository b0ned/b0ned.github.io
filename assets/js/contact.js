window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('service_0yzkln4', 'contact_form', this)
            .then(() => {
                const form = document.getElementById('contact-form');
                form.innerHTML = "Thank you for reaching out, I will be in contact with you shortly."
                console.log('Success!');

            }, (error) => {
                alert('Something went wrong, please try again')
                console.log('Failed!', error)
            })
    })
}