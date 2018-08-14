#!/usr/bin/python
# -*- coding: iso-8859-1 -*-
import os, sys, time 
# from lxml import etree #xml parser
# import xml.etree.ElementTree as ET #xml parser ElemenTree only
import argparse
from Bio import Phylo
from Bio.Phylo import PhyloXML
#from Bio.Phylo import PhyloXMLIO

def get_parser():
	parser = argparse.ArgumentParser(description='fastosh xml')
	parser.add_argument('-i', action="store", dest='xml', 
				type=str, required=True, help='XML path (REQUIRED)')
	return parser

def main():
	##################### get parser ###############################
	parser=get_parser()

	######## Print parser help if arguments missed #################
	if len(sys.argv)==1:
		parser.print_help()
		sys.exit(1)

	########### Manage workflow accorded to Args  ##################
	Arguments=parser.parse_args()

	# parser = etree.XMLParser(remove_blank_text=True)
	# xmlfile = Arguments.xml
	# tree = etree.ElementTree()
	# tree =etree.parse(xmlfile,parser)
	# print tree
	# root = tree.getroot()
	# print root
	# test = root.xpath("phylogeny")
	# print test
	# for var in test :
	# 	toto = var.findall("clade")[0]
	# 	print toto.text
	# 	print var

	tree = Phylo.read("jpp2.xml",'phyloxml')

	for clade in tree.find_clades(name=True):
		clade.other = [PhyloXML.Other(tag="annotation", namespace="", children=[PhyloXML.Other('desc', value = 'youpi'),PhyloXML.Other('uri', value = 'http://lol.com')])]
		clade.annotation = PhyloXML.Annotation(desc="youpi", uri="http://lol.com")

	Phylo.write(tree, "jpp.xml", 'phyloxml')


if __name__ == "__main__":													
	main()	

#Conversion newick vers phyloxml: Télécharger le fichier forester.jar

#java -cp forester.jar org.forester.application.phyloxml_converter -f=nn LISTERIA_taxonomy.nwk test2.xml



