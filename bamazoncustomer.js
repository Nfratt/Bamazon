//require mysql 
var mysql = require('mysql');
// require inquirer
var inquirer = require('inquirer');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3300,
  user: "root",
  password: "*****",
  database: "Bamazon"
});

function init(){
    //prints the items for sale and info 
    connection.query('SELECT * FROM Products', function(err, res){
      for(var i = 0; i<res.length;i++){
        console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name
         + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        console.log('--------------------------------------------------------------------------------------------------')
        if(err) throw err;
      }
    })
}

      inquirer.prompt([
        {
          type: "input",
          name: "id",
          message: "What is the ID of the product you would like to purchase?",
          validate: function(value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
              return true;} 
              else{
              return false;
            }
          },
          
            type: "prompt",
            name: "amount",
            message: "How much would you like to purchase?",
            validate: function(value){
              if(isNaN(value)){
                return false;
              } else{
                return true;
              }
            }
           }]).then(function(ans){
            var whatToBuy = (ans.id)-1;
            var howMuch = parseInt(ans.qty);
            var Total = parseFloat(((res[whatToBuy].Price)*howMuch).toFixed(2));
      
            //check if amount is available 
            if(res[whatToBuy].StockQuantity >= howMuch){
              //after purchase, updates quantity in Products
              connection.query("UPDATE Products SET ? WHERE ?", [
              {StockQuantity: (res[whatToBuy].StockQuantity - howMuch)},
              {ItemID: ans.id}
              ], function(err, result){
                  if(err) throw err;
                  console.log("Success! Your total is $" + Total.toFixed(2) +
                   ". it will be shipped soon ");
              });
              connection.query("SELECT * FROM Departments", function(err, deptRes){
                if(err) throw err;
                var index;
                for(var i = 0; i < deptRes.length; i++){
                  if(deptRes[i].DepartmentName === res[whatToBuy].DepartmentName){
                    index = i;
                  }
                }
                 //updates totalSales in departments table
          connection.query("UPDATE Departments SET ? WHERE ?", [
            {TotalSales: deptRes[index].TotalSales + grandTotal},
            {DepartmentName: res[whatToBuy].DepartmentName}
            ], function(err, deptRes){
                if(err) throw err;
                //console.log("Updated Dept Sales.");
            });
          });
  
        } else{
          console.log("Sorry, not enough stock");
        }
  
        reprompt();
      })
  })
  }
  //ask if they are done
function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to keep shopping?"
  }]).then(function(ans){
    if(ans.reply){
      start();
    } else{
      console.log("See you soon!");
    }
  });
}
          init();