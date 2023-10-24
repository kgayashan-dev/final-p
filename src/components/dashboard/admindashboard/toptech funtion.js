// top technician funtion 

 const [technicians, setTechnicians] = useState([]);
  const [topRatedTechnicians, setTopRatedTechnicians] = useState([]);
  const [topRatedTechnicianNames, setTopRatedTechnicianNames] = useState([]);
  
  useEffect(() => {
    const q = query(collection(db, "technician"));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const technicianArr = [];
      querySnapshot.forEach((doc) => {
        technicianArr.push({ ...doc.data(), id: doc.id });
      });
      setTechnicians(technicianArr);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    let maxRate = 0;
    const topTechnicians = [];
  
    technicians.forEach((technician) => {
      if (technician.rate > maxRate) {
        maxRate = technician.rate;
        topTechnicians.length = 0; // Clear the array of previous top technicians
        topTechnicians.push(technician);
      } else if (technician.rate === maxRate) {
        topTechnicians.push(technician);
      }
    });
  
    setTopRatedTechnicians(topTechnicians);
    // Set the names of top-rated technicians
    setTopRatedTechnicianNames(topTechnicians.map((tech) => tech.name));
  }, [technicians]);
  
 const technicianset = topRatedTechnicianNames.join(', ');