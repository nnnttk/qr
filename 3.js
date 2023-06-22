var TEST_NUMERIC = /^\d+$/;
 var TEST_ALPHANUMERIC = /^[0-9A-Z$%*+-./: ]+$/;
 
 function chooseBestModeData(data) {
   if (TEST_NUMERIC.test(data)) {
		return new QRCode.QRNumeric(data);
   } else if (TEST_ALPHANUMERIC.test(data)) {
		return new QRCode.QRAlphanumeric(data);
   }

   try {
		return new QRCode.QRKanji(data);
   } catch (error) {
		return new QRCode.QRByte(data);
   }
 }
	  
 var data = window.location.href;
 //var mode = encodeMode.val();
 var mode = 'Auto';
 //var ecLevel = encodeECLevel.val();
 var ecLevel = 'L';
 //var margin = Number(encodeMargin.val());
 var margin = '5';
 //var moduleSize = Number(encodeMSize.val());
 var moduleSize = '8';
 //var hasEncodingHint = encodingHint.prop('checked');
 var hasEncodingHint = false;

 var qrcode = new QRCode.Encoder();
 var errorCorrectionLevel = QRCode.ErrorCorrectionLevel[ecLevel];

 qrcode.setEncodingHint(hasEncodingHint).setErrorCorrectionLevel(errorCorrectionLevel);

 try {
	var data = mode === 'Auto' ? chooseBestModeData(data) : new QRCode[mode](data);

	qrcode.write(data).make();

	var srcimgQR = qrcode.toDataURL(moduleSize, margin); console.log(srcimgQR);
   
 } catch (error) {
   alert(error.message);
 }	  

var imgQR = '<img id="srcQR" class="srcQR" src="'+srcimgQR+'"></img>';

function nambah(){
	var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
  	// Insert a row in the table at row index 0
  	var newRow   = tableRef.insertRow(tableRef.rows.length);
  	// Insert a cell in the row at index 0
  	var newCell  = newRow.insertCell(0);
  	// Append a text node to the cell
  	var newText  = document.createTextNode(imgQR);
  	newCell.appendChild(newText);
} 

$(document).ready(function(){          
	$('table').each(function(){ 
            $(this).attr("id", "myTable"); 
            nambah();  
        }); 
 }); 
