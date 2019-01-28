
package jeffsmithprogram;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

public class CarFileReader {
    private static final String SOURCE = "cars/";
    private static ArrayList<String> carFiles = new ArrayList<String>();
    public static void loadFiles(){
        loadCarFileNames();
        loadInCars();
    }
    
    private static void loadCarFileNames(){
        try {
            FileReader fileReader = new FileReader(SOURCE + "carNameFile.txt");
            BufferedReader fileBuffer = new BufferedReader(fileReader);
            String line = fileBuffer.readLine();
            while (line!=null){
                carFiles.add(line);
                line = fileBuffer.readLine();
            }
        } catch (Exception e){
            e.printStackTrace();
            System.exit(1);
        }
    }
    
    private static void loadInCars(){
        for (String carFileName: carFiles){
            try {
                FileReader fileReader = new FileReader(SOURCE + carFileName + ".txt");
                BufferedReader fileBuffer = new BufferedReader(fileReader);
                String line = fileBuffer.readLine();
                ArrayList<Date> dates = new ArrayList<Date>();
                while (line!=null){
                    dates.add(Car.complexDateFormat.parse(line));
                    line = fileBuffer.readLine();
                }
                Date dateArray[] = new Date[dates.size()];
                for (int i = 0; i < dates.size(); i++) dateArray[i] = dates.get(i);

                Car.cars.add(new Car(carFileName, dateArray));

                fileReader.close();
                
            } catch (Exception e){
                e.printStackTrace();
            }
        }
    }
    
    public static void saveCars() throws IOException{
        File carFile;
        BufferedWriter carNameWriter = new BufferedWriter(new FileWriter(new File(SOURCE+"carNameFile.txt")));
        for (Car car: Car.cars){
            carFile = new File(SOURCE + car.ID + ".txt");
            if (!carFile.exists()) carFile.createNewFile();
            
            carNameWriter.write(car.ID);
            carNameWriter.newLine();
            
            try {
                BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(carFile));

                for (int i = 0; i < car.datesCharged.size(); i++){
                    bufferedWriter.write(Car.complexDateFormat.format(car.datesCharged.get(i)));
                    bufferedWriter.newLine();
                }
            bufferedWriter.close();
                
            } catch (Exception e) {
                e.printStackTrace();
                System.exit(1);
            } 
           
        }
        carNameWriter.close();
    }
    
    public static void removeCar(Car c){
        try {
            File carFile = new File(SOURCE + c.ID + ".txt");
            if (carFile.delete()){
                System.out.println("car deleted");
            } else {
                System.out.println("car not deleted");
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }
    
}
