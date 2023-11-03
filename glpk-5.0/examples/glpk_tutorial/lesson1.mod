var XB;
var XC;

maximize prft: 25*XB+30*XC;

subject to toal_time_per_week :1/200*XB +1/140 *XC <=40;
subject to b_limit :0<=XB<=6000;
subject to c_limit :0<=XC<=4000;


solve; 

display XB;
display XC;
display prft;

printf "---------------------------------\n";
printf "\n";

printf "XB: %10g\n", XB;
printf "XC: %10g\n", XC;
printf "PROFIT: %10g\n", prft;