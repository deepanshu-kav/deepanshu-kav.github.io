function again(){
	document.loan_form.loan_amount.value="";
	document.loan_form.numOfMonths.value="";
	document.loan_form.interest.value="";
	document.loan_form.extra.value="0";
	
	document.getElementById("loan-receipt").innerHTML="";
	document.getElementById("table").innerHTML="";
}

function validate(){
	var loan_amnt=document.loan_form.loan_amount.value;
	var months=document.loan_form.numOfMonths.value;
	var rate=document.loan_form.interest.value;
	var ext=document.loan_form.extra.value;
	
	if(loan_amnt <=0 || isNaN(Number(loan_amnt))){
		alert("Please enter a valid loan amount");
		document.loan_form.loan_amount.value="";
	 
    }
	else if(months <=0 || parseInt(months) != months){
		alert("Please enter a valid  number of months");
		document.loan_form.numOfMonths.value="";
	}
	else if(rate <=0 || isNaN(Number(rate))){
		alert("Please enter a valid interest rate");
	     document.loan_form.interest.value="";
	}
	else if(ext <0 || isNaN(Number(ext))){
		alert("Please enter a valid extra monthly amount");
		document.loan_form.extra.value="0";
	}
	else{
	calculate(parseFloat(loan_amnt), parseInt(months), parseFloat(rate), parseFloat(ext));
	}
}

function calculate(loan_amnt,months,rate,ext){
 var i=rate/100;
var payment=loan_amnt*(i/12)*Math.pow((1+i/12),months)/(Math.pow((1+i/12),months)-1);	
	var info="";
	info+="<table width='250'>";
	info+="<tr><td>Loan Amount:</td>";
	info+="<td align='right'>Rs"+loan_amnt+"</td></tr>";
	
	info+="<tr><td>Num of Months::</td>";
	info+="<td align='right'>"+months+"</td></tr>";
	
	info+="<tr><td>Interest Rate:</td>";
	info+="<td align='right'>"+rate+"%</td></tr>";
	
	info+="<tr><td>Monthly Payment:</td>";
	info+="<td align='right'>Rs"+round(payment,2)+"</td></tr>";
	
	info+="<tr><td>Extra:</td>";
	info+="<td align='right'>Rs"+ext+"</td></tr>";
	
	info+="<tr><td>Total Payment:</td>";
	info+="<td align='right'>Rs"+round(payment+ext,2)+"</td></tr>";
	
	info+="</table>";
	document.getElementById("loan-receipt").innerHTML=info;
	
	
	var table="";
	table+="<table cellpadding='12' border='1'>";
	table+="<tr>";
	table+="<td width='40'>0</td>";
	table+="<td width='70'>&nbsp</td>";
	table+="<td width='70'>&nbsp</td>";
	table+="<td width='70'>&nbsp</td>";
	table+="<td width='120'>&nbsp</td>";
	table+="<td width='75'>"+round(loan_amnt,2)+"</td>";
	table+="</tr>";
	
	var current_balance=loan_amnt;
	var payment_counter=1;
	var total_interest=0;
	payment=payment+ext;
	while(current_balance>0){
		towards_interest=(i/12)*current_balance;
		if(payment>current_balance){
			payment=current_balance+towards_interest;
		}
		towards_balance=payment-towards_interest;
		total_interest=total_interest+towards_interest;
		current_balance=current_balance-towards_balance;
		table+= "<tr>";
		table+="<td>"+payment_counter+"</td>";
		table+="<td>"+round(payment,2)+"</td>";
		table+="<td>"+round(towards_balance,2)+"</td>";
		table+="<td>"+round(towards_interest,2)+"</td>";
		table+="<td>"+round(total_interest,2)+"</td>";
		table+="<td>"+round(current_balance,2)+"</td>";
		table+="</tr>";
		payment_counter++;
	}
		
	
	table+="</table>";
	document.getElementById("table").innerHTML=table;
}

function round(num,dec){
	return(Math.round(num*Math.pow(10,dec))/Math.pow(10,dec)).toFixed(dec);
}