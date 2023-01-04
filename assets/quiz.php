<?php 
 require './database.php';
 $query = "SELECT * FROM questions";
    $DB=new Database();
    $conn=$DB->connect();

    $stmt =$conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $data = array();
    foreach($result as $row){
        $data[] = $row;
    }
    $query = "SELECT * FROM options";
    $DB=new Database();
    $conn=$DB->connect();
    $stmt =$conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $options = array();
    foreach($result as $row){
        $options[] = $row;
    }
    // echo "<pre>";
    // print_r($data);
    // echo "</pre>";
    // die;




    for($i=0; $i<sizeof($options); $i++){
        for($j=0; $j<sizeof($data); $j++){
            if($options[$i]['question_id'] == $data[$j]['id']){
                $data[$j]['answer'][] = $options[$i]['answer'];
            }
        }
    }

    

    
    
    echo json_encode($data);
?>