#!/usr/bin/python
# -*- coding: iso-8859-1 -*-
import os, sys, time
import argparse
from pymongo import MongoClient
import uuid



##################################
#####  Arguments definition  #####
##################################


def get_parser():
	# Fonction permettant de pourvoir demander des arguments

	parser = argparse.ArgumentParser(description='Create mash matrix and rooted taxonomic tree with FasTosh')

	parser.add_argument('-i', action="store", dest='input', 
						type=str, required=True, help='txt file with strains ID (REQUIRED)')

	parser.add_argument('--dbuser', action="store", dest='DbUser',
						type=str, required=False, default='', help='MongoDB database username')

	parser.add_argument('--dbpassword', action="store", dest='DbPassword',
						type=str, required=False, default='', help='MongoDB database password')
	
	return parser


def get_sketch_path(input, user, password):
	# Fonction permettant de récupérer le chemin des sketch dans la base de données
	# et de les mettre dans un fichier tsv.

	id_list = open(input, 'r')
	IDs = id_list.readlines()
	id_list.close()

	# Connection à la base de données GAMeRdb
	if user != ''  and password != '' :
		uri = "mongodb://" + DbUser + ":" + Arguments.DbPassword + "@localhost/GAMeRdb"
		client = MongoClient(uri)
	else:
		client = MongoClient('localhost', 27017)

	# Utilisation de la collection GENOME de la base GAMeRdb
	db = client.GAMeRdb
	genomes = db.GENOME

	# Requête pour récupérer les chemins
	dico_paths = {}
	#paths = open("paths.tsv", 'w')

	for ID in IDs :
		ID = ID.rstrip()
		infos = genomes.find({"SampleID":ID})

		for info in infos :
			dico_paths[info['SampleID']] = "NASBIO1/" + info['Genome']['Sketch']

	file_name = str(uuid.uuid4())
	file_name = file_name + ".tsv"

	paths_file = open(file_name, 'w')

	for path in dico_paths:
		paths_file.write(dico_paths[path] + "\n")

	paths_file.close()

	return file_name

def make_taxonomy(file_name):
	# Fonction qui réalise l'inférence taxonomique

	os.system("python FasTosh -i " + file_name + " -o distance_matrix -e taxonomy -T 10")




###########################
#####  Main function  #####
###########################

def main():

	##################### gets arguments #####################

	parser=get_parser()
	
	#print parser.help if no arguments
	if len(sys.argv)==1:
		parser.print_help()
		sys.exit(1)
	
	# mettre tout les arguments dans la variable Argument
	Arguments=parser.parse_args()

    #####################  gets sketch path and make taxonomy  #####################
	
	sketch_path = get_sketch_path(Arguments.input, Arguments.DbUser, Arguments.DbPassword)
	taxonomy = make_taxonomy(sketch_path)
	
	#####################    #####################
	
	

# lancer la fonction main()  au lancement du script
if __name__ == "__main__":
	main()	            		           		
