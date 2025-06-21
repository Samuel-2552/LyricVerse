const { getDb } = require('../db/mongoClient');
const { planSchema, moduleSchema } = require('../models/planSchema');

// Get all plans with their accessible modules
const getAllPlans = async (req, res) => {
  try {
    const db = getDb();
    const plansCollection = db.collection('plans');
    const modulesCollection = db.collection('modules');

    // Get all plans
    const plans = await plansCollection.find({}).toArray();
    
    // Get all modules
    const modules = await modulesCollection.find({}).toArray();
    
    // Create a modules map for quick lookup
    const modulesMap = {};
    modules.forEach(module => {
      modulesMap[module._id] = module;
    });

    // Attach module details to each plan
    const plansWithModules = plans.map(plan => ({
      ...plan,
      accessibleModules: plan.accessibles.map(moduleId => modulesMap[moduleId]).filter(Boolean)
    }));

    res.status(200).json({
      success: true,
      data: plansWithModules
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Get plan details by ID
const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    const plansCollection = db.collection('plans');
    const modulesCollection = db.collection('modules');

    const plan = await plansCollection.findOne({ _id: parseInt(id) });
    
    if (!plan) {
      return res.status(404).json({
        success: false,
        error: 'Plan not found'
      });
    }

    // Get modules for this plan
    const modules = await modulesCollection.find({
      _id: { $in: plan.accessibles }
    }).toArray();

    const planWithModules = {
      ...plan,
      accessibleModules: modules
    };

    res.status(200).json({
      success: true,
      data: planWithModules
    });
  } catch (error) {
    console.error('Error fetching plan:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Update plan modules
const updatePlanModules = async (req, res) => {
  try {
    const { id } = req.params;
    const { accessibles } = req.body;

    // Validate input
    const { error } = planSchema.validate({ _id: parseInt(id), planType: 'temp', accessibles });
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        details: error.details
      });
    }

    const db = getDb();
    const plansCollection = db.collection('plans');

    // Check if plan exists
    const existingPlan = await plansCollection.findOne({ _id: parseInt(id) });
    if (!existingPlan) {
      return res.status(404).json({
        success: false,
        error: 'Plan not found'
      });
    }

    // Update the plan
    const result = await plansCollection.updateOne(
      { _id: parseInt(id) },
      { $set: { accessibles } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Plan not found'
      });
    }

    // Get updated plan
    const updatedPlan = await plansCollection.findOne({ _id: parseInt(id) });

    res.status(200).json({
      success: true,
      message: 'Plan updated successfully',
      data: updatedPlan
    });
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Add or edit modules
const addOrEditModule = async (req, res) => {
  try {
    const { _id, name, description, features } = req.body;

    // Validate input
    const { error } = moduleSchema.validate({ _id, name, description, features });
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        details: error.details
      });
    }

    const db = getDb();
    const modulesCollection = db.collection('modules');

    // Check if module exists
    const existingModule = await modulesCollection.findOne({ _id });
    
    if (existingModule) {
      // Update existing module
      const result = await modulesCollection.updateOne(
        { _id },
        { $set: { name, description, features } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          error: 'Module not found'
        });
      }

      const updatedModule = await modulesCollection.findOne({ _id });
      
      res.status(200).json({
        success: true,
        message: 'Module updated successfully',
        data: updatedModule
      });
    } else {
      // Create new module
      const newModule = { _id, name, description, features };
      await modulesCollection.insertOne(newModule);
      
      res.status(201).json({
        success: true,
        message: 'Module created successfully',
        data: newModule
      });
    }
  } catch (error) {
    console.error('Error adding/editing module:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

module.exports = {
  getAllPlans,
  getPlanById,
  updatePlanModules,
  addOrEditModule
}; 