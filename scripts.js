function myInArray(key, arr) {
    if ($.inArray(key, arr) == -1) {
        return false;
    }

    return true;
}

const THE_WORD = 'hasło';

const leftKeys = [37, 8];
const deleteKeys = [8];

const notFullWarning = 'Wypełnij wszystkie pola';

jQuery(document).ready(($) => {
    var tries = 0;

    const isFormFull = () => {
        var isFull = true;
        $letters.each((ix,el) => {
            if ($(el).val().length == 0) {
                isFull = false;
                return;
            }
        });

        return isFull;
    }

    const checkLetters = () => {
        var $new_answer = $(`<div class="game__answer game__answer-${++tries}"></div>`)
        $answers.append($new_answer);

        var correct = true;
        var letterClass = '';

        $letters.each((ix,el) => {
            letterClass = 'correct';
            var WORD_LETTERS = THE_WORD.split('');

            if ($(el).val().toLowerCase() != WORD_LETTERS[ix]) {
                correct = false;
                letterClass = 'wrong';
            }

            $new_answer.append(`<span class="game__answer-letter game__answer-letter--${letterClass}">${$(el).val().toUpperCase()}</span>`);
        });

        if (correct) {
            $warning.text('Brawo!');
        }
    }

    var $game = $('.game');
    var $form = $('.game__form', $game);
    var $answers = $('.game__answers', $game);

    var $inputs_wrapper = $('.game__inputs', $form);
    var $warning = $('.game__warning', $form);

    var $letters = $('input', $inputs_wrapper);

    $letters.eq(0).focus();

    $letters.on('keydown', (e) => {
        let ix = $letters.index(document.activeElement);
        let key = e.which;

        if ((myInArray(key, leftKeys)) && ix != 0) {
            ix = ix - 1;
        } else if (!myInArray(key, leftKeys)) {
            ix = ix + 1;
        }

        $letters.on('keyup', (e) => {
            $letters.eq(ix).focus();
        });
    });

    $form.on('submit', (e) => {
        e.preventDefault();

        if (!isFormFull()) {
            $warning.text(notFullWarning)
            return;
        }
        checkLetters();

    });

});