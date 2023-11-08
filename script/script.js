<!--Tooltip Scripts & Settings-->
<script src="https://unpkg.com/popper.js@1"></script>
<script src="https://unpkg.com/tippy.js@4"></script>
<script>
tippy('.tooltip', {        
 animation: 'fade',    
 duration: 200,      
 arrow: true,          
 delay: [0, 50],      
 arrowType: 'sharp',  
 theme: 'light-border',        
 maxWidth: 568,    
 interactive: true,
})
</script>



<!-- Скрипт маски ввода номера начало -->
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"></script>
<script>
  $(document).ready(function() {
    $('input[ms-code-phone-number]').each(function() {
      var input = this;
      var preferredCountries = $(input).attr('ms-code-phone-number').split(',');

      var iti = window.intlTelInput(input, {
        preferredCountries: preferredCountries,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
      });

      $.get("https://ipinfo.io", function(response) {
        var countryCode = response.country;
        iti.setCountry(countryCode);
      }, "jsonp");

      input.addEventListener('change', formatPhoneNumber);
      input.addEventListener('keyup', formatPhoneNumber);

      function formatPhoneNumber() {
        var formattedNumber = iti.getNumber(intlTelInputUtils.numberFormat.NATIONAL);
        input.value = formattedNumber;
      }

      var form = $(input).closest('form');
      form.submit(function() {
        var formattedNumber = iti.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL);
        input.value = formattedNumber;
      });
    });
  });
</script>
<!-- Скрипт маски ввода номера конец -->


<!-- Скрипт формул -->
<script>
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('Calculator').addEventListener('click', function () {
            var radioButton = findCheckedRadioButton([
                'Radio_1', 'Radio_2', 'Radio_3', 'Radio_5', 'Radio_6', 'Radio_8'
            ]);

            if (radioButton) {
                var data = parseFloat(radioButton.value);
                updateFormulas(data, ['#formula', '#formula_2', '#formula_3'], ['#val_formula', '#val_formula_2', '#val_formula_3']);
            }
        });

        function findCheckedRadioButton(ids) {
            for (var i = 0; i < ids.length; i++) {
                var radioButton = document.getElementById(ids[i]);
                if (radioButton.checked) {
                    return radioButton;
                }
            }
            return null;
        }

        function updateFormulas(data, formulaSelectors, valFormulaSelectors) {
            formulaSelectors.forEach(function (selector, index) {
                var formulaElement = document.querySelector(selector);
                var valFormulaElement = document.querySelector(valFormulaSelectors[index]);

                var result = (index === 0) ? data / 2 : (index === 1) ? data : data * 1.2;

                // Update the formula element
                formulaElement.textContent = formatResult(result) + ' кВт';

                // Update the corresponding value element
                if (valFormulaElement) {
                    valFormulaElement.value = formatResult(result) + ' кВт';
                }
            });
        }

        function formatResult(result) {
            return result.toFixed(2).replace(/\.?0+$/, '');
        }
    });
</script>


<script>
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('Calculator_1').addEventListener('click', function () {
            var radioButton = findCheckedRadioButton([
                'Radio_10', 'Radio_15', 'Radio_20', 'Radio_25', 'Radio_30', 'Radio_50', 'Radio_100'
            ]);

            if (radioButton) {
                var data = parseFloat(radioButton.value);
                updateFormulas(data, ['#formula', '#formula_2', '#formula_3'], ['#val_formula', '#val_formula_2', '#val_formula_3']);
            }
        });

        function findCheckedRadioButton(ids) {
            for (var i = 0; i < ids.length; i++) {
                var radioButton = document.getElementById(ids[i]);
                if (radioButton.checked) {
                    return radioButton;
                }
            }
            return null;
        }

        function updateFormulas(data, formulaSelectors, valFormulaSelectors) {
            formulaSelectors.forEach(function (selector, index) {
                var formulaElement = document.querySelector(selector);
                var valFormulaElement = document.querySelector(valFormulaSelectors[index]);

                var result = (index === 0) ? data / 2 : (index === 1) ? data : data * 1.2;

                // Update the formula element
                formulaElement.textContent = formatResult(result) + ' кВт';

                // Update the corresponding value element
                if (valFormulaElement) {
                    valFormulaElement.value = formatResult(result) + ' кВт';
                }
            });
        }

        function formatResult(result) {
            return result.toFixed(2).replace(/\.?0+$/, '');
        }
    });
</script>

<!-- Скрипт виведення результату -->
<script>
    document.addEventListener('DOMContentLoaded', function () {
        var locationPVSystemSpan = document.getElementById('location_PV_system');
        var inverterPhasesRadios = document.getElementsByName('Select-the-number-of-inverter-phases');
        var inverterPowerRadios = document.getElementsByName('Select-the-inverter-power');
        var inverterPowerVRadios = document.getElementsByName('Select-the-inverter-power-V2');
        var powerPVModulesRadios = document.getElementsByName('Select-the-power-of-photovoltaic-modules');
        var numberInverterPhasesSpan = document.getElementById('number_inverter_phases');
        var inverterPowerSpan = document.getElementById('inverter_power');
        var powerPVModulesSpan = document.getElementById('power_PV_modules');
        var buttonNext = document.querySelectorAll('.button-next');

        buttonNext.forEach(function (button, index) {
            button.addEventListener('click', function () {
                updateResults(index);
            });
        });

        function updateResults(index) {
            if (index === 0) {
                updateLocationPVSystem();
            } else if (index === 1) {
                updateNumberInverterPhases();
            } else if (index === 2) {
                updateInverterPower();
            } else if (index === 3) {
                updatePowerPVModules();
            }
        }

        function updateLocationPVSystem() {
            var radioButtons = document.getElementsByName('Location-of-photovoltaic-modules');
            for (var i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].checked) {
                    locationPVSystemSpan.innerHTML = 'Selected location: <strong>' + radioButtons[i].value + '</strong>';
                    break;
                }
            }
        }

        function updateNumberInverterPhases() {
            for (var i = 0; i < inverterPhasesRadios.length; i++) {
                if (inverterPhasesRadios[i].checked) {
                    numberInverterPhasesSpan.innerHTML = 'Number of inverter phases: <strong>' + inverterPhasesRadios[i].value + '</strong>';
                    break;
                }
            }
        }

        function updateInverterPower() {
            var selectedPowerRadio = getSelectedRadioValue(inverterPowerRadios, inverterPowerVRadios);
            inverterPowerSpan.innerHTML = 'Selected inverter power: <strong>' + selectedPowerRadio + '</strong>';
        }

        function updatePowerPVModules() {
            var selectedPowerPVModulesRadio = getSelectedRadioValue(powerPVModulesRadios);
            powerPVModulesSpan.innerHTML = 'Power of photovoltaic modules: <strong>' + selectedPowerPVModulesRadio + '</strong>';
        }

        function getSelectedRadioValue(radiosGroup1, radiosGroup2) {
            var radioButtons = radiosGroup1.length ? radiosGroup1 : radiosGroup2;
            for (var i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].checked) {
                    return radioButtons[i].value;
                }
            }
            return '';
        }
    });
</script>





<script>
        document.addEventListener('DOMContentLoaded', function () {
            var powerPVModulesRadios = document.getElementsByName('Select-the-power-of-photovoltaic-modules');
            var powerPVModulesSpan = document.getElementById('power_PV_modules');
            var formulaBtn = document.getElementById('formula_btn');

            formulaBtn.addEventListener('click', function () {
                updatePowerPVModules();
            });

            function updatePowerPVModules() {
                for (var i = 0; i < powerPVModulesRadios.length; i++) {
                    if (powerPVModulesRadios[i].checked) {
                        powerPVModulesSpan.innerHTML = 'Power of photovoltaic modules: <strong>' + powerPVModulesRadios[i].value + '</strong>';
                        break;
                    }
                }
            }
        });
</script>
