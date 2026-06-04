const STORAGE_KEY = "budget_tracker";

const sampleData = [
  {
    id: 1,
    type: "income",
    amount: 30000,
    category: "Salary",
    date: "2026-06-01",
  },
  {
    id: 2,
    type: "expense",
    amount: 500,
    category: "Food",
    date: "2026-06-02",
  },
  {
    id: 3,
    type: "expense",
    amount: 300,
    category: "Travel",
    date: "2026-06-03",
  },
];

 export const initializeData = () =>{
    const existingData = localStorage.getItem(STORAGE_KEY);

    if(!existingData){
        localStorage.setItem(STORAGE_KEY , JSON.stringify(sampleData));
    }
}

