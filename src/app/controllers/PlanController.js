import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({});
    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const existNamePlan = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (existNamePlan) {
      return res.status(400).json({ error: 'Title of plan already exist' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json(
      `Novo plano cadastrado com sucesso!!
       nome: ${title},
       duração de ${duration} meses,
       no valor total de R$ ${price} `
    );
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().integer(),
    });

    const { id } = req.params;

    const planFind = await Plan.findOne({
      where: { id },
    });

    if (!planFind) {
      return res.status(400).json(`User with ID: ${id} not found.`);
    }

    /* if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    } */

    const existNamePlan = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (existNamePlan) {
      return res.status(400).json({ error: 'Title of plan already exist' });
    }

    const { title, duration, price } = await planFind.update(req.body);

    return res.json({ id, title, duration, price });
  }

  async delete(req, res) {
    return res.json('delete');
  }
}

export default new PlanController();
