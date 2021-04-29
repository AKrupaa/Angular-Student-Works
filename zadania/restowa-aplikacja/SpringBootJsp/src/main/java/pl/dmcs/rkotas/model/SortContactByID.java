package pl.dmcs.rkotas.model;

import java.util.Comparator;

public class SortContactByID implements Comparator<Contact> {
    @Override
    public int compare(Contact o1, Contact o2) {
        return (int) (o1.getId() - o2.getId());
    }
}

//class Sortbyroll implements Comparator<Student> {
//    // Used for sorting in ascending order of
//    // roll number
//    public int compare(Student a, Student b) {
//        return a.rollno - b.rollno;
//    }
//}