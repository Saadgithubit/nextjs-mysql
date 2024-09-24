'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.createTable('users', { 
        id: {
          type:Sequelize.INTEGER.UNSIGNED,
          autoIncrement:true,
          primaryKey:true
        } ,
        name:{
          type:Sequelize.STRING,
          allowNull:false
        },
        create_at: {
          type: Sequelize.DATE,
          allowNull:false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        update_at: {
          type: Sequelize.DATE,
          allowNull:false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
      });
     
  },

  async down (queryInterface) {  
     await queryInterface.dropTable('users');     
  }
};
