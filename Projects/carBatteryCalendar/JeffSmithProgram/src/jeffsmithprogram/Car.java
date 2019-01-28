
package jeffsmithprogram;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;


public class Car {
    
    public static ArrayList<Car> cars = new ArrayList<Car>();
    public static SimpleDateFormat generalDateFormat = new SimpleDateFormat("dd/MM/yyyy");
    public static SimpleDateFormat complexDateFormat = new SimpleDateFormat("dd/MM/yyyy  HH:mm:ss");
    
    String ID;
    Date firstAdded;
    ArrayList<Date> datesCharged = new ArrayList<Date>();
    
    public static final int MAX_DAYS_BETWEEN_CHARGE = 30;
    public static final int DISPLAY_WITH_DAYS_LEFT = 3;
    
    public Car(String _id, Date[] _datesCharged){
        ID = _id;
        for (int i = 0; i < _datesCharged.length; i++){
            datesCharged.add(_datesCharged[i]);
        }
    }
    
    public int getDaysScinceLastCharge(){
        
        Date today = new Date();
        Date lastCharge = datesCharged.get(datesCharged.size()-1);
        
        long timeBetween = (today.getTime() - lastCharge.getTime());
        long daysBetween = timeBetween/(1000*3600*24);
        
        return (int)daysBetween;
    }
    
    public int getDaysUntilDue(){
        return MAX_DAYS_BETWEEN_CHARGE - getDaysScinceLastCharge();
    }
    
    public String getGeneralInfo(){
        String info = "";
        
        info += "Car ID: " + ID + "<br/>";
        info += "Last Charge: " + generalDateFormat.format(datesCharged.get(datesCharged.size()-1)) + "<br/>";
        if (getDaysUntilDue() > DISPLAY_WITH_DAYS_LEFT) info += "Days until next charge: " + getDaysUntilDue() + "<br/>";
        else info += "<strong style='color=rgb(100, 0, 0);'>Days until next charge: " + getDaysUntilDue() + "</strong><br/>";
        
        return info;
    }
    
    public String getHistorySearch(){
        String outputString = "<strong>History Search For Car ID: "+ ID +" </strong><br/>";
        
        outputString += "Last Charge: " + complexDateFormat.format(datesCharged.get(datesCharged.size()-1)) + "<br/><br/>";
        
        int daysBeforeDue;
        for (int i = datesCharged.size()-1; i >= 0; i--){
            if (i >= 1){
                daysBeforeDue = (int)((datesCharged.get(i).getTime() - datesCharged.get(i-1).getTime()) / (1000*3600*24));
                daysBeforeDue = MAX_DAYS_BETWEEN_CHARGE - daysBeforeDue;
                outputString += "Charged: " + complexDateFormat.format(datesCharged.get(i)) + "<br/>";
                outputString += "With <strong style='color: "+ (daysBeforeDue>DISPLAY_WITH_DAYS_LEFT?"black":"rgb(100, 0, 0)") +";'>" + daysBeforeDue + "</strong> days left until next charge<br/><br/>";
            } else {
                outputString += "Added: " + generalDateFormat.format(datesCharged.get(i)) + "<br/>";
            }
        }
        
        return outputString;
    }
    
    public void reset(){
        datesCharged.add(new Date());
    }
    
}
