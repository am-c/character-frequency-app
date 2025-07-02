function init() {
  //global variables
  var results = [];
  var combined = {};

  $('.char-output').html('');
  $('.char-count').html('');
  $('.saveBtn').hide();

  // textarea input change
  $('textarea[name="text-input"]').change(function () {

  // reset results and combined
    results = [];
    combined = {};

    $('.char-count').html('');

    let input = $(this).val();

    if (input !== '') {
      $('.char-output').html('<br/><p> <strong>Output:</strong><em>' + input + '</em><br/><br/></p>');
      $('.saveBtn').show();
    }

    input = input.toUpperCase();

    let occurance = {};
    for (let i = 0; i < input.length; i++) {
      //assigns number to each letter based on i
      let letter = input.charAt(i);
     // checks if the letter is already in occurance
      let number = occurance[letter];
      // if number exists ++, if not == 1
      occurance[letter] = number ? number + 1 : 1;
    }
// regex to exclude special characters
    const aZ = /^[a-z]+$/i;
    for (let letter in occurance) {
      if (letter.match(aZ) && letter !== '') {
        $('.char-count').append(`<span>Letter: ${letter}<br/> Occurrences: ${occurance[letter]}</span><br/>`);
        results.push({ [letter]: occurance[letter] });
      }
    }
//combines results array into one object (combined)
    combined = results.reduce((acc, obj) => Object.assign(acc, obj), {});
    console.log(combined);
  });

  // save users input
  $('.saveBtn').click(function (e) {
    e.preventDefault();

    const outputVal = $('.char-output em').eq(0).text();

    $.ajax({
      url: 'http://localhost:3000/save',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        output: outputVal,
        count: combined,
        timestamp: new Date().toISOString(),
      }),
      success: function () {
        console.log('saved');
        $('.saved-alert').show();
        setTimeout(() => {
          $('.saved-alert').fadeOut();}, 1000);
      },
      error: function () {
        alert('Error saving input');
      },
    });
  });
}
