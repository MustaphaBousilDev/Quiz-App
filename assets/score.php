<?php

require './database.php';
    $score=0;
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

    $q=$_REQUEST['q'];
    $q=json_decode($q);



    
    for($i=0;$i<sizeof($q);$i++){
        $question=$q[$i]->question;
        $answer=$q[$i]->answer;
        foreach($data as $d){
            if($d['question']==$question){
                if($answer==$d['correct']){
                    $score+=10;
                }
            }
        }
    }
    echo json_encode($score);
?>