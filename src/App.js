import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';

class App extends React.Component {

    componentDidMount() {    
        $('textarea[name="am-text"]').change(function() {
      
          $('.am-done').click(function() {
      
            var input = $('textarea[name="am-text"]').val();
      
            if (input !== '')
              $('.txt-output').html('<br/><p> <strong>Output: </strong><em>' + input + '</em><br/><br/></p>');
      
            $('.freq-output').html('');
      
            input = input.toUpperCase();
            var occurence = {};
            var letter, counter, length, number;
      
            for (counter = 0, length = input.length; counter < length; counter++) {
              letter = input.charAt(counter);
              number = occurence[letter];
              occurence[letter] = number ? number + 1 : 1;
            }
      
            var aZ = /^[a-z]+$/i;
            for (letter in occurence) {
              if (letter.match(aZ) && letter !== '') {
                $('.freq-output').append("<span>Letter: " + letter + "<br/> Occurrences: " +
                  occurence[letter] + '</span><br/>');
              }
      
            }
      
          });
      
        });

        $('.am-reset').click(function() {
          $('.txt-output').html('');
        $('.freq-output').html('');
        });
    }
  
    render() {
      return (
     <div className="container">
        <h1>Character Frequency Count</h1>
        <form>
          <br />
          <textarea className="form-control am-text" name="am-text" rows="10"></textarea>
          <br />
          <br />
          <input type="reset" className="btn btn-large btn-warning am-done" value="Check Frequency" />
          <button type="reset" className="btn btn-light am-reset" value="Reset">Reset</button>
        </form>
        <div className="txt-output"></div>
        <hr />
        <div className="freq-output"></div>
     </div>
      );
    }
  }
  

export default App;
