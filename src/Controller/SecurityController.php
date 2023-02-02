<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

#[Route('/api')]
class SecurityController extends AbstractController
{
    #[Route('/validate', name: 'app_security', methods: ["POST"])]
    public function validate(Request $request, EntityManagerInterface $em): Response
    {
        //create response
        $response = new Response();
        $response->setStatusCode(404);

        // get data from client-form.
        $parameters = json_decode($request->getContent(), true);

        // check if username && token are in db:
        if($user = $em->getRepository(User::class)->findBy(["username"=>$parameters["user"]])){
            if($user[0]->getToken() === $parameters["token"]){
                $response->setStatusCode(200);
            }
        }

        return $response;
    }
}
