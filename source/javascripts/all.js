//= require_tree .

$(document).ready(function() {
  var labelXML = "";

  $.get("/javascripts/StudentNametag.label", function(data) {
    labelXML = data;
  });

  var printers = dymo.label.framework.getPrinters();
  var printerName = "";
  for (var i = 0; i < printers.length; ++i)
  {
      var printer = printers[i];
      if (printer.printerType == "LabelWriterPrinter")
      {
          printerName = printer.name;
          break;
      }
  }

  $('#print').click(function() {
    if (labelXML === "") {
      return false;
    }

    var label = dymo.label.framework.openLabelXml(labelXML);
    label.setObjectText("FirstName", "Chris");
    label.setObjectText("LastName", "White");
    label.setObjectText("MajorGradDate", "Computer Science");

    if (printerName === "") {
      alert('No Printers Available. If you have a printer attached, please try restarting your computer.');
      return false;
    }

    label.print(printerName)

    console.log('hi!');
    return false;
  });
});
