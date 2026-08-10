import { Router } from 'express';
import { CompanyProfileController } from '../controllers/companyProfile.controller';
import { RoleController } from '../controllers/role.controller';
import { ProgramController } from '../controllers/program.controller';
import { AIController } from '../controllers/ai.controller';
import { PreseededController } from '../controllers/preseeded.controller';

const router = Router();

// Preseeded Data Routes
router.get('/preseeded-companies', PreseededController.getCompanies);
router.get('/preseeded-companies/:id/roles', PreseededController.getCompanyRoles);

// Company Profile Routes
router.get('/company-profiles', CompanyProfileController.getAll);
router.post('/company-profiles', CompanyProfileController.create);
router.put('/company-profiles/:id', CompanyProfileController.update);
router.delete('/company-profiles/:id', CompanyProfileController.delete);

// Role Routes
router.get('/roles', RoleController.getAll);
router.post('/roles', RoleController.create);
router.put('/roles/:id', RoleController.update);
router.delete('/roles/:id', RoleController.delete);

// Program Routes
router.get('/programs', ProgramController.getAll);
router.post('/programs', ProgramController.create);

// AI Curation Proxy Routes
router.post('/generate-competency', AIController.generateCompetency);
router.post('/generate-problem-chips', AIController.generateProblemChips);
router.post('/generate-outcome-chips', AIController.generateOutcomeChips);
router.post('/generate-habit-program-v2', AIController.generateHabitProgramV2);

export default router;
